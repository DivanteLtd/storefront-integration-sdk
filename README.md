# Vue Storefront integration easy as 1-2-3

Vue Storefront is platform agnostic which means it can be connected to virtually any CMS. Currently we do officially support:
- [Magento2](https://github.com/DivanteLtd/mage2vuestorefront) via `mage2vuestorefront` + `vue-storefront-api` data bridge,
- [Magento1](https://github.com/DivanteLtd/magento1-vsbridge) via `magento1-vsbrdige` data bridge.
- Limited: [Pimcore](https://github.com/DivanteLtd/pimcore2vuestorefront) via `pimcore2vuestorefront` data bridge,

In this repository You can find materials that will let You integrate any other 3rd party platform or bespoke e-Commerce backend with the Vue Storefront.

## Three steps of integration

- **Layer A** Vue Storefront uses Elastic Search as backend for all catalog operations. It stores products, categories, attributes and tax-rules in the ES and fetch data from it using [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) project.

- **Layer B** The second layer are so called **dynamic calls** that are used to synchronize shopping carts, promotion rules, user accounts etc.

However, `vue-storefront-api` was initially meant to support all kind of requests (and it's supporting them for Magento2 currently) - we found that's much easier to create a **dedicated api** which provides the same data formats like `vue-storefront-api` around Your platform of choice, than adding very customized data adapters in the `vue-storefront-api` itself.

That means that creating the Vue Storefront integration basically is divided into 3 main steps:

1. [You exposes the API around Your platform](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/tree/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS) of choice regarding our spec. In fact it's a `vue-storefront-api` enpodints specification. Having such an API - Vue Storefront will be able to speak directly with Your platform as a backend **Layer B**.

2. [You need to use `node-app` application](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/tree/master/2.%20Use%20node-app%20to%20import%20the%20data/node-app) to import the data from the freshly created API endpoints to the Elastic Search **Layer A**.


3. [Then You just need to point `vue-storefront`](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/3.%20Configure%20vue-storefront/How%20to%20configure%20Vue%20Storefront.md) application to newly created endpoints.



## Step 1: How to expose the API around Your platform

You may take a look [how we did it for the Magento1](https://github.com/DivanteLtd/magento1-vsbridge/tree/master/magento1-module/app). It was a bunch of additional Magento1 api methods we created to fullfill the [API specification](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/tree/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS). You can create a separate nodejs/php/rails/whatever app if Your platform doesn't exposes the required API and just fullfill the spec.

## Step 2: How to use node-app

Then, having the API in place You're to fo the **Layer A** integration. Which means - to fill the ElasticSearch with products, categories, attributes and taxrules data.

You can use our [boilerplate node-app](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/tree/master/2.%20Use%20node-app%20to%20import%20the%20data/node-app) which is compilant with the data formats specified above.
This is a consumer application that's responsible for synchronizing the Magento1 data with the ElasticSearch instance.

This tool required ElasticSearch instance up and running. The simplest way to have one is to install [vue-storefront](https://github.com/DivanteLtd/vue-storefront) and [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api) and run `docker-compose up` inside `vue-storefront-api` installation as the project [contains Docker file](https://github.com/DivanteLtd/vue-storefront-api/blob/master/docker-compose.yml) for Vue Storefront.

Then you need to modify the configs:

```
cd node-app/src
cp config.example.json config.json
nano config.json
```

In the config file please setup the following variables:
- `auth` section to setup user login and password - these values will be used to generate the JWT token used to [authorize the requests against Your API](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeauthadmin)
- ['endpoints'](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/ed646dce9be22207e3cc08a05c8913e7673f4aeb/2.%20Use%20node-app%20to%20import%20the%20data/node-app/config.example.json#L134) should match the public URLs of Your API corresponding methos (for auth, products, categories, taxrule and attributes)
- `elasticsearch.indexName` - should be set to Your ElasticSearch index which then will be connected to the Vue Storefront. It can be fresh / non-existient index as well (will be created then). For example You may have: `vue_storefront_mangento1`

### Available commands
The bridge works on temporary, versioned ES indexes. You decide when the index should be published (when all data objects are properly set).

Create new version of index (for example: vue_storefront_mangento1_1): 
```
node index.js new
```

Index data:
```
node index.js attributes
node index.js taxrules
node index.js categories
node index.js products
```

Publish new version of index (creates an alias with prod. name of the index: vue_storefront_magento1_1 -> vue_storefront_magento1): 
```
node index.js publish
```

Congratulations! After this step You should have got the ES index synchronized with Your custom platform!

## Step 3: How to configure vue-storefront

All You need to do is to set the proper API endpoints in the `config/local.json`. [Here You have the details](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/3.%20Configure%20vue-storefront/How%20to%20configure%20Vue%20Storefront.md).

Please note that You still need to use the `vue-storefront-api` for accessing the ElasticSearch / do the server side tax callculation etc.


# Support

This is MIT project so it's ... just AS IS :) However, if You're planing to add the new platform to the Vue Storefront ecosystem and publish it freely as an open source - we'll do our best to support You! 

Please feel free to contact the core team on [Slack channel](http://slack.vuestorefront.io) or via contributors@vuestorefront.io
