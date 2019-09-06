const promiseLimit = require('../lib/promise')

module.exports = class {
    constructor(entityType, customImporter, config, api, db) {
        this.config = config
        this.db = db
        this.api = api
        this.entityType = entityType
        this.customImporter = customImporter
        this.single = this.single.bind(this)
    }

    
    /**
     * @returns Promise
     */
    single(object) {
        return new Promise(((resolve, reject) => {
            resolve([object]); // no additional processing
        }))
    }
}