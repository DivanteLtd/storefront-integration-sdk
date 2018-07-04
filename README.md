# Vue Storefront integration easy as 1-2-3

Vue Storefront is platform agnostic which means it can be connected to virtually any CMS. Currently we do officially support:
- [Magento2]() via `mage2vuestorefront` + `vue-storefront-api` data bridge,
- [Magento1](https://github.com/DivanteLtd/magento1-vsbridge) via `magento1-vsbrdige` data bridge.
- Limited: [Pimcore](https://github.com/DivanteLtd/pimcore2vuestorefront) via `pimcore2vuestorefront` data bridge,

In this repository You can find materials that will let You integrate any other 3rd party platform or bespoke e-Commerce backend with the Vue Storefront.

## Three steps of integration

- **Layer A** Vue Storefront uses Elastic Search as backend for all catalog operations. It stores products, categories, attributes and tax-rules in the ES and fetch data from it using [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api) project.

- **Layer B** The second layer are so called **dynamic calls** that are used to synchronize shopping carts, promotion rules, user accounts etc.

However, `vue-storefront-api` was initially meant to support all kind of requests (and it's supporting them for Magento2 currently) - we found that's much easier to create a **dedicated api** which provides the same data formats like `vue-storefront-api` around Your platform of choice, than adding very customized data adapters in the `vue-storefront-api` itself.

That means that creating the Vue Storefront integration basically is divided into 3 main steps:

1. [You exposes the API around Your platform]() of choice regarding our spec. In fact it's a `vue-storefront-api` enpodints specification. Having such an API - Vue Storefront will be able to speak directly with Your platform as a backend **Layer B**.

2. [You need to use `node-app` application]() to import the data from the freshly created API endpoints to the Elastic Search **Layer A**.


3. [Then You just need to point `vue-storefront`]() application to newly created endpoints.



## Step 1: How to expose the API around Your platform


## Step 2: How to use node-app


## Step 3: How to configure vue-storefront
