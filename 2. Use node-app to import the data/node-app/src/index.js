const config = require('../config.json')
const VsBridgeApiClient = require('./lib/vsbridge-api')
const api = new VsBridgeApiClient(config)

const BasicImporter = require('./importers/basic')

const _ = require('lodash')

const promiseLimit = require('promise-limit')
const limit = promiseLimit(3) // limit N promises to be executed at time
const promise = require('./lib/promise') // right now we're using serial execution because of recursion stack issues
const path = require('path')
const shell = require('shelljs')
const fs = require('fs')
const jsonFile = require('jsonfile')

const putMappings = require('./meta/elastic').putMappings


let INDEX_VERSION = 1
let INDEX_META_DATA
let AUTH_TOKEN = '' 
const INDEX_META_PATH = path.join(__dirname, '../var/indexMetadata.json')

const { spawn } = require('child_process');

const es = require('elasticsearch')
let client = new es.Client({ // as we're runing tax calculation and other data, we need a ES indexer
    host: config.elasticsearch.host,
    log: 'error',
    apiVersion: '5.5',
    requestTimeout: 10000
})

const CommandRouter = require('command-router')
const cli = CommandRouter()

cli.option({ name: 'page'
, alias: 'p'
, default: 0
, type: Number
})
cli.option({ name: 'pageSize'
, alias: 'l'
, default: 25
, type: Number
})

cli.option({ name: 'partitions'
, alias: 't'
, default: 20
, type: Number
})

cli.option({ name: 'runSerial'
, alias: 's'
, default: false
, type: Boolean
})


function showWelcomeMsg() {
    console.log('** CURRENT INDEX VERSION', INDEX_VERSION, INDEX_META_DATA.created)
}

function authUser(callback) {
    return api.post(config.vsbridge['auth_endpoint']).type('json').send({
        username: config.vsbridge.auth.username,
        password: config.vsbridge.auth.password,
    }).end((resp) => {
        if(resp.body && resp.body.code == 200)
        {
            console.log('Got auth token ', resp.body.result)

            if (callback) {
                callback(resp.body);
            }

        } else {
            console.error(resp.body.result);
        }
    });
}

function readIndexMeta() {
    let indexMeta = { version: 0, created: new Date(), updated: new Date() }

    try {
        indexMeta = jsonFile.readFileSync(INDEX_META_PATH)
    } catch (err){
        console.log('Seems like first time run!', err.message)
    }
    return indexMeta
}

function recreateTempIndex() {

    let indexMeta = readIndexMeta()

    try { 
        indexMeta.version ++
        INDEX_VERSION = indexMeta.version
        indexMeta.updated = new Date()
        jsonFile.writeFileSync(INDEX_META_PATH, indexMeta)
    } catch (err) {
        console.error(err)
    }

    let step2 = () => { 
        client.indices.create({ index: `${config.elasticsearch.indexName}_${INDEX_VERSION}` }).then(result=>{
            console.log('Index Created', result)
            console.log('** NEW INDEX VERSION', INDEX_VERSION, INDEX_META_DATA.created)
        }).then((result) => {
            putMappings(client, `${config.elasticsearch.indexName}_${INDEX_VERSION}`, ()  => {})
        })
    }


    return client.indices.delete({
        index: `${config.elasticsearch.indexName}_${INDEX_VERSION}`
    }).then((result) => {
        console.log('Index deleted', result)
        return step2()
    }).catch((err) => {
        console.log('Index does not exst')
        return step2()
    })
}

function publishTempIndex() {
    let step2 = () => { 
        client.indices.putAlias({ index: `${config.elasticsearch.indexName}_${INDEX_VERSION}`, name: config.elasticsearch.indexName }).then(result=>{
            console.log('Index alias created', result)
        })
    }


    return client.indices.deleteAlias({
        index: `${config.elasticsearch.indexName}_${INDEX_VERSION-1}`,
        name: config.elasticsearch.indexName 
    }).then((result) => {
        console.log('Public index alias deleted', result)
        step2()
    }).catch((err) => {
        console.log('Public index alias does not exists', err.message)
        step2()
    })  
}

function storeResults(singleResults, entityType) {
    singleResults.map((ent) => {
        client.index({
            index: `${config.elasticsearch.indexName}_${INDEX_VERSION}`,
            type: entityType,
            id: ent.id,
            body: ent
        })                    
    })
}


/**
 * Import full list of specific entites
 * @param {String} entityType 
 * @param {Object} importer 
 */
function importListOf(entityType, importer, config, api, page = 0, pageSize = 100, recursive = true) {

    if (!config.vsbridge[entityType + '_endpoint'])
    {
        console.error('No endpoint defined for ' + entityType)
        return
    }

    return new Promise((resolve, reject) => {

        let query = {
            entityType: entityType,
            page: page,
            pageSize: pageSize
        }


        let generalQueue = []
        console.log('*** Getting objects list for', query)
        api.authWith(AUTH_TOKEN);
        api.get(config.vsbridge[entityType + '_endpoint']).type('json').query(query).end((resp) => {
            
            if (resp.body && resp.body.code !== 200) { // unauthroized request
                console.log(resp.body.result);
                process.exit(-1);    
            }

            let queue = []
            let index = 0
            for(let obj of resp.body.result) { // process single record
                let promise = importer.single(obj).then((singleResults) => {
                    storeResults(singleResults, entityType)
                    console.log('* Record done for ', obj.id, index, pageSize)
                    index++
                })
                if(cli.options.runSerial)
                    queue.push(() => promise)
                else
                    queue.push(promise)
            }
            let resultParser = (results) => {
                console.log('** Page done ', page, resp.body.result.length)
                
                if(resp.body.result.length === pageSize)
                {
                    if(recursive) {
                        console.log('*** Switching page!')
                        return importListOf(entityType, importer, config, api, page + 1, pageSize) 
                    }
                }
            }
            if(cli.options.runSerial)
                promise.serial(queue).then(resultParser).then((res) => resolve(res)).catch((reason) => { console.error(reason); reject() })
            else 
                Promise.all(queue).then(resultParser).then((res) => resolve(res)).catch((reason) => { console.error(reason); reject() })
        })
    })
}

cli.command('products',  () => { // TODO: add parallel processing
   showWelcomeMsg()

   importListOf('product', new BasicImporter('product', config, api, page = cli.options.page, pageSize = cli.options.pageSize), config, api, page = cli.options.page, pageSize = cli.options.pageSize).then((result) => {

   }).catch(err => {
      console.error(err)
   })
})    

cli.command('taxrules',  () => {
    importListOf('taxrule', new BasicImporter('taxrule', config, api, page = cli.options.page, pageSize = cli.options.pageSize), config, api, page = cli.options.page, pageSize = cli.options.pageSize).then((result) => {
 
    }).catch(err => {
       console.error(err)
    })       

});

cli.command('attributes',  () => {
    showWelcomeMsg()

    importListOf('attribute', new BasicImporter('attribute', config, api, page = cli.options.page, pageSize = cli.options.pageSize), config, api, page = cli.options.page, pageSize = cli.options.pageSize).then((result) => {
 
    }).catch(err => {
       console.error(err)
    })       
});

cli.command('categories',  () => { 
    showWelcomeMsg()

    importListOf('category', new BasicImporter('category', config, api, page = cli.options.page, pageSize = cli.options.pageSize), config, api, page = cli.options.page, pageSize = cli.options.pageSize).then((result) => {
 
    }).catch(err => {
       console.error(err)
    })    
});



cli.command('new',  () => {
    showWelcomeMsg()
    recreateTempIndex()
});


cli.command('publish',  () => {
    showWelcomeMsg()
    publishTempIndex()
});

cli.on('notfound', (action) => {
  console.error('I don\'t know how to: ' + action)
  process.exit(1)
})
  
  
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
   // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', function (exception) {
    console.error(exception); // to see your exception details in the console
    // if you are on production, maybe you can send the exception details to your
    // email as well ?
});
  

INDEX_META_DATA = readIndexMeta()
INDEX_VERSION = INDEX_META_DATA.version
authUser((authResp) => {
  // RUN
  AUTH_TOKEN = authResp.result
  cli.parse(process.argv);
})


 
// Using a single function to handle multiple signals
function handle(signal) {
    console.log('Received  exit signal. Bye!');
    process.exit(-1)
  }
process.on('SIGINT', handle);
process.on('SIGTERM', handle);
