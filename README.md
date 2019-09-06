# Vue Storefront Custom Integration Tutorial

Vue Storefront is platform agnostic which means it can be connected to virtually any CMS. This repository was created in order to make the integration with any 3rd party backend platform as easy as possible.

## Three steps for the integration

- **Step One** Vue Storefront uses Elastic Search as backend for all catalog operations. We do have **three** default types of entities that must be supported: `product`, `category`, `attribute` and **two optional entities** `taxrule`, `cms_block` and `cms_page` in the ES. You may find some sample-data json [files in `sample-data` subdirectory](sample-data).

- **Step Two** The second step is to support the **dynamic calls** that are used to synchronize shopping carts, promotion rules, user accounts etc. In order to have this step accomplished you'll need to implement 

- **Step Three** Is to configure `vue-storefront` to use the right set of endpoints from Step Two.


## Tutorial

Now, we're to go thru all three steps in order to integrate Vue Storefront with custom or 3rd party eCommerce platform.

First, make sure you've got the [vue-storefront and vue-storefront-api installed](https://docs.vuestorefront.io/guide/installation/linux-mac.html#installing-the-vue-storefront-api-locally) on your local machine, up and running. Opening the [http://localhost:3000](http://localhost:3000) should display default Vue Storefront theme with demo products.

**Note:** As we'll be using extensively Elastic Search for the next steps in this tutorial, make sure you've got the right tooling to browse the ES indexes. I'm using [es-head](https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm). Pretty easy to use and simple tool, provided as a Google Chrome plugin.


### **Empty the `vue_storefront_catalog` index**.  
This is the default Vue Storefront index which is configured in both `vue-storefront` and `vue-storefront-api` projeccts - in the `config/local.json`, `elasticsearch.indices` section. We'll be using default.

First, please go to `vue-storefront-api` directory. In my case i did it by the following command:

```bash
MacBook-Pro-Piotr-3:sample-data pkarwatka$ cd ~/Documents/_PROJEKTY/vue-storefront-api
MacBook-Pro-Piotr-3:vue-storefront-api pkarwatka$ 
```

Then you can empty the default index:

```bash
MacBook-Pro-Piotr-3:vue-storefront-api pkarwatka$ yarn db new
yarn run v1.17.3
$ node scripts/db.js new
Elasticsearch INFO: 2019-09-06T19:32:23Z
  Adding connection to http://localhost:9200/

** Hello! I am going to create NEW ES index
Elasticsearch DEBUG: 2019-09-06T19:32:23Z
  starting request {
    "method": "DELETE",
    "path": "/*/_alias/vue_storefront_catalog",
    "query": {}
  }
  
...
```

**Note:** Please make sure your local Elastic instance is up and running. After you've got the `vue-storefront` plus `vue-storefront-api` installed you can ensure it by just running `docker-compose up -d` in the `vue-storefront-api` directory.

### **Import data**.
In your custom integration you'll be probably pumping the data directly to ElasticSearch as it changed in the platform admin panel.

This is exactly how do work other Vue Storefront integrations you might want to get inspired by:
- [`magento2-vsbridge-indexer`](https://github.com/DivanteLtd/magento2-vsbridge-indexer) - the PHP based integration for Magento2,
- [`shopware2vuestorefront](https://github.com/DivanteLtd/shopware2vuestorefront/tree/master/vsf-shopware-indexer) - which is using a NodeJS app to pull the data from Shopware API and push it to Elastic,
- [`spree2vuestorefront`](https://github.com/spark-solutions/spree2vuestorefront/) - which is putting thte data to Elastic directly from Ruby code, from Spree Commerce database,
- [See other integrations ...](https://github.com/frqnck/awesome-vue-storefront#github-repos)

In our example, we'll just push the static json files from `sample-data` directly to ElasticSearch index. Then I'll explain these data formats in details to let you prepare such an automatic exporter on your own.

To push the data into Elastic we'll be using a simple NodeJS tool [located in the sample-data folder]().

Now we can import the data:

```bash
MacBook-Pro-Piotr-3:vue-storefront-api pkarwatka$ cd ~/Documents/_PROJEKTY/vue-storefront-integration-boilerplate/sample-data/
MacBook-Pro-Piotr-3:sample-data pkarwatka$ node import.js products.json product vue_storefront_catalog
Importing product { id: 1769,
  name: 'Chloe Compete Tank',
  image: '/w/t/wt06-blue_main.jpg',
  sku: 'WT06',
  url_key: 'chloe-compete-tank',
  url_path:
   'women/tops-women/tanks-women/bras-and-tanks-26/chloe-compete-tank-1769.html',
  type_id: 'configurable',
  price: 39,
  special_price: 0,
  price_incl_tax: null,
  special_price_incl_tax: null,
  special_to_date: null,
  special_from_date: null,
  status: 1,
  size: null,
  color: null,
  size_options: [ 167, 168, 169, 170, 171 ],
  color_options: [ 50, 58, 60 ],
  category_ids: [ '26' ],
  media_gallery:
  ...
{ _index: 'vue_storefront_catalog',
  _type: 'product',
  _id: '1433',
  _version: 2,
  result: 'updated',
  _shards: { total: 2, successful: 1, failed: 0 },
  created: false }
{ _index: 'vue_storefront_catalog',
  _type: 'product',
  _id: '1529',
  _version: 2,
  result: 'updated',
  _shards: { total: 2, successful: 1, failed: 0 },
  created: false }
```

Then please do execute the same import scripts for `atttribute` and `category` entities:

```bash
MacBook-Pro-Piotr-3:sample-data pkarwatka$ node import.js attributes.json attribute vue_storefront_catalog
MacBook-Pro-Piotr-3:sample-data pkarwatka$ node import.js categories.json catetgory vue_storefront_catalog
```

After importing the data  we need to make sure the Vue Storefront Elastic index schema has been properly applied. To ensure this we'll use the [Database tool](https://docs.vuestorefront.io/guide/data/database-tool.html) used previously to clear out the index - once again:

```bash
MacBook-Pro-Piotr-3:vue-storefront-api pkarwatka$ yarn db rebuild
yarn run v1.17.3
$ node scripts/db.js rebuild
Elasticsearch INFO: 2019-09-06T20:13:28Z
  Adding connection to http://localhost:9200/

** Hello! I am going to rebuild EXISTING ES index to fix the schema
** Creating temporary index vue_storefront_catalog_1567800809
Elasticsearch DEBUG: 2019-09-06T20:13:28Z
  starting request {
    "method": "DELETE",
    "path": "/*/_alias/vue_storefront_catalog_1567800809",
    "query": {}
  }
```

After data has been imported you can check if it works just opening `http://localhost:3000` and using the Search feature:

<img src="screens/screen_0_products.png" width="300" />

**Congratulations!** Now it's a good moment to take deep breath and study the data formats we'd just imported in order to create your own mapper from the custom platform of your choice to Vue Storefront format.

### Product entity

You might have seen that our data formats are pretty much similar to Magento formats. We've simplified them and aggregated. **Some parts are denormalized** on purpose. We're trying to avoid the relations known from the standard databases and rather use the DTO concept. For example, Product is a DTO containing all information necessary to display the PDP (Product Details Page): including `media_gallery`, `configurable_children` and other features. It's then fairly easy to cache the data for the Offline mode and performance.

[Read the full Product entity specification](Format-product.md)

### Attribute entity

Vue Storefront uses the attributes meta data dictionaries saved in the `attribute` entities. They're related to the `product`. The `attribute.attribute_code` represents the `product[attribute_code]` proeprty - when defined. When not, the `product[attribute_code]` is being used as a plain tetxt.

[Read more on why Attributes are important](Format-attribute.md)

### Category entity

Categories are being used mostly for building the tree navigation. Vue Storefront uses the [dynamic-catetgories-prefetching](https://docs.vuestorefront.io/guide/basics/configuration.html#dynamic-categories-prefetching). Please make sure that **all the categorries** are indexed on the main level - even if they exist as a `category.children_data` assigned to any other category.

[Read the Category format specification](Format-category.md)


### TaxRate entity

**Note:** TaxRates are skipped from `sample-data` as they're not crucial to display the products and categories in Vue Storefront (as long as the taxes are calculated and imported to Elastic)

Here is the data format:

```json
{
  "id": 2,
  "code": "Poland",
  "priority": 0,
  "position": 0,
  "customer_tax_class_ids": [3],
  "product_tax_class_ids": [2],
  "tax_rate_ids": [4],
  "calculate_subtotal": false,
  "rates": [
    {
      "id": 4,
      "tax_country_id": "PL",
      "tax_region_id": 0,
      "tax_postcode": "*",
      "rate": 23,
      "code": "VAT23%",
      "titles": []
    }
  ]
}
```

To read more on how tax rates are processed when `config.tax.calculateServerSide=false`, please [study the taxCalc.ts](https://github.com/DivanteLtd/vue-storefront/blob/develop/core/modules/catalog/helpers/taxCalc.ts).


### Write your API adapter for dynamic requests

Vue Storefornt doesn't store any user's data neither order or payment information. Even shopping carts - are just stored locally in the browser and then synced with the server (`cart/merge` Vuex action). 

Whenever product is being added to the cart or user authorization is being performed there is a API request executed.

[Read more on the required API endpoints you must provide in order to have Vue Storefront synchronized](Dynamic%20API%20specification.md)

**Note:** If you're to use Vue Storefront just for catalog browsing purposes you can probably skip this step. In that case please make sure your `vue-storefront` instance is properly configured with the `config.cart.synchronize=false` and `config.cart.synchronize_totals=false`.


### Configure vue-storefront

All You need to do is to set the proper dynamic API endpoints in the `config/local.json`. [Here You have the details](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/3.%20Configure%20vue-storefront/How%20to%20configure%20Vue%20Storefront.md).


# Support

This is MIT project so it's ... just AS IS :) However, if You're planing to add the new platform to the Vue Storefront ecosystem and publish it freely as an open source - we'll do our best to support You! 

Please feel free to contact the core team at [Vue Storefront Forum](https://forum.vuestorefront.io/c/development/integrations), on [Slack channel](http://slack.vuestorefront.io) or via contributors@vuestorefront.io
