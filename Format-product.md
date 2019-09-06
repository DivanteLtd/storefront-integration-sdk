## Product entity

In the `Vue Storefront` there is a [defined Product type](https://github.com/DivanteLtd/vue-storefront/blob/master/core/modules/catalog/types/Product.ts) you're to use in your TypeScript code. It contains quite many optional fields. Please check the [sample-data/products.json](sample-data/products.json) to make sure which fields are trully crucial for Vue Storefront to work.

Here we present the core purpose of the product properties:

```json
    "id": 1769,
```

This is unique product identifier, it's numeric - and it's defined as integer in the [elastic.schema.product.json](https://github.com/DivanteLtd/vue-storefront-api/blob/d7b6fe516eeb214615f54726fb382e72ff2cc34b/config/elastic.schema.product.json#L15) however nowhere in the code is it used as `intval`. That means when you need to have product IDs presented as GUID's or strings - please just feel free to [modify the schema](https://github.com/DivanteLtd/vue-storefront-api/blob/d7b6fe516eeb214615f54726fb382e72ff2cc34b/config/elastic.schema.product.json#L15) and run `yarn db rebuild`. Should be fine!


```json
    "name": "Chloe Compete Tank",
```

This is just a product name :-)

```json
    "image": "/w/t/wt06-blue_main.jpg",
```

Proudct image - by deafult it's relative because [`vue-storefront-api/img` endpoint](https://github.com/DivanteLtd/vue-storefront-api/blob/d7b6fe516eeb214615f54726fb382e72ff2cc34b/src/api/img.js#L38) uses this relative URL against the base platform images URL/CDN in order to generate the thumbnail.

**Note:** If you like to use the **absolute urls** that's not a problem. Please put the absolute URL in this field and then make sure the `vue-storefront` knows about it by setting the `config.images.useExactUrlsNoProxy`. It will use the exact image URLs without the resizer. You can also do the trick to use the resizer still with the absolute URLS, by setting the `config.images.baseUrl` to the URL address containing `{{url}}` placeholder. Something like: [`https://demo.vuestorefront.io/img/?url={{url}}`](https://github.com/DivanteLtd/vue-storefront-api/blob/d7b6fe516eeb214615f54726fb382e72ff2cc34b/src/api/img.js#L28). The [magic happens here](https://github.com/DivanteLtd/vue-storefront/blob/5602c144a36e7829698240f5123224e2aad6fe4e/core/helpers/index.ts#L61).

```json
    "sku": "WT06",
```

Stock Keeping Unit is a unique string. Format is not restricted to any form. It's used as a cache key for products. It's also being used for figuring out the selected configurable variant of `configurable` product.

```json
    "url_key": "chloe-compete-tank",
    "url_path": "women/tops-women/tanks-women/bras-and-tanks-26/chloe-compete-tank-1769.html",
```

As of Vue Storefront 1.9 the `url_key` is no longer used for URL routing. It's just a string and well.. it's optional. The `urlo_path` however is a must. It must be also unique across all routable URL addresses, because it's being used by the [Url Dispatcher](https://github.com/DivanteLtd/vue-storefront/blob/bb6f8e70b5587ed73c457d382c7ac93bd14db413/core/modules/url/store/actions.ts#L59) to map the URL to specific product for PDP.

```json
    "type_id": "configurable",
```

Vue Storefront is supporting the following product types:
- `simple` - [simple product](https://demo.storefrontcloud.io/gear/gear-3/wayfarer-messenger-bag-4.html) with no configurable options,
- `configurable` - [product with variants](https://demo.storefrontcloud.io/men/bottoms-men/shorts-men/shorts-19/sol-active-short-1007.html?childSku=MSH10) - they're assigned in the `configurable_children` and the options used to select the proper variant (like `color` and `size`) are defined in the `configurable_options`,
- `bundle` - [product that consits other products](https://demo.storefrontcloud.io/gear/gear-3/sprite-yoga-companion-kit-45.html) under single virtual SKU. The sub-products can be configured / checked / unchecked. 
- `grouped` - [product grouping different products](https://demo.storefrontcloud.io/gear/gear-3/set-of-sprite-yoga-straps-2046.html) that are added to the cart as separate items,
- `virtual` - virtual products are partially supported (Vue Storefront is not asking the user for shipping info if there are just virtuals in the cart, that's it).

The `routes` in the Vue Storefront [are customizable](https://github.com/DivanteLtd/vue-storefront/blob/bb6f8e70b5587ed73c457d382c7ac93bd14db413/src/themes/default/router/index.js#L43) to specific product types so you can create different PDP's for specific types of products.

```json
    "price": 39,
```

This is the price that Vue Storefront [treats as Nett price](https://github.com/DivanteLtd/vue-storefront/blob/develop/core/modules/catalog/helpers/taxCalc.ts) (not including tax). The thing is that by default Vue Storefront is taking the prices from the Elastic/Backend but you can switch the `config.tax.calculateServerSide=false` in order to start calculating the taxes in the frontend app (for example based on the current address).

```json
    "special_price": 0,
```

This is a special price (if set, the `price` will be crossed over in the UI) - also Nett.

```json
    "price_incl_tax": null,
    "special_price_incl_tax": null,
```

If these fields are set, Vue Storefront is showing these prices as default, end user prices in the store. They should include all the  taxes.

```json
    "special_to_date": null,
    "special_from_date": null,
```

Special price field is limited in the time by these dates (should be ISO date format). [See how](https://github.com/DivanteLtd/vue-storefront/blob/5602c144a36e7829698240f5123224e2aad6fe4e/core/modules/catalog/helpers/taxCalc.ts#L3).

```json
    "status": 1,
```

Product status:
 - <=1 - product is enabledd,
 - 2 - product is disabled,
 - 3 - product is out of stock (however VSF is rather checking the `stock.is_in_stock` property).


 ```json
    "visibility": 4,
```

Visibility status:
- 1 - not visible (won't be displayed in the listings),
- 2 - visible in catalog,
- 3 - visible in search,
- 4 - visible in both

```json
    "size": null,
    "color": null,
```

Color, size - typically a numeric indexes. Vue Storefront for all [non system properties](https://github.com/DivanteLtd/vue-storefront/blob/bb6f8e70b5587ed73c457d382c7ac93bd14db413/config/default.json#L181) is loading the `attribute` definitions.

If the definition exists then if the type is `select` or `multiselect` the value of the property is used as a index in the attribute values dictionary. [Read more on attributes](Format-attribute.md). Otherwise it's being used as a text.

So you can put any color name you like in this field and it still could be used for product browsing. This is for example how the [`bigcommerce2vuestorefront`](https://github.com/DivanteLtd/bigcommerce2vuestorefront/blob/42efbb05aef1f37bfb944910b662d39c5de5e37a/src/templates/product.js#L77) integration works. It's not using the attribute metadata at all because for some platforms using kind of Wordpress like semantics it's very hard to create  an attribute dictionary.

```json
    "size_options": [
      167,
      168,
      169,
      170,
      171
    ],
    "color_options": [
      50,
      58,
      60
    ],
```

For any property (color and sizes are just an examples) you might want to create an `propertyName + "_options"` helper which [is being used for product filtering](https://github.com/DivanteLtd/vue-storefront/blob/5602c144a36e7829698240f5123224e2aad6fe4e/core/lib/search/adapter/api/elasticsearchQuery.js#L72). In this case it consist of all `configurable_children` colors and sizes.

```json
    "category_ids": [
      "26"
    ],
```

Category IDs (don't have to be numeric but usually they are :-)). This field is used for product filtering on the `Category.vue` page in Vue Storefront.

```json
    "category": [
      {
        "category_id": 26,
        "name": "Bras & Tanks",
        "slug": "bras-and-tanks-26",
        "path": "women/tops-women/tanks-women/bras-and-tanks-26"
      }
    ],
```
Additionaly to `category_ids` we have a `category` collection which is denormalized set of categories assigned to this product. It's being used in `SearchPanel` [for generating the output categories](https://github.com/DivanteLtd/vue-storefront/blob/5602c144a36e7829698240f5123224e2aad6fe4e/src/themes/default/components/core/blocks/SearchPanel/SearchPanel.vue#L119) in the search results and .. probably that's all. So if you disable this feature, the `category` property is no longer needed.

```json
    "media_gallery": [
      {
        "image": "/w/t/wt06-blue_main.jpg",
        "pos": 1,
        "typ": "image",
        "lab": null,
        "vid": null
      },
      {
        "image": "/w/t/wt06-blue_back.jpg",
        "pos": 2,
        "typ": "image",
        "lab": null,
        "vid": null
      }
    ],
```

This is just a list of images used by the `ProductGallery` component. Paths can be relative or absolute - exactly the same as with `product.image`.

```json
    "configurable_options": [
      {
        "id": 300,
        "attribute_id": "93",
        "label": "Color",
        "position": 1,
        "values": [
          {
            "value_index": 50,
            "label": "Blue"
          },
          {
            "value_index": 58,
            "label": "Red"
          },
          {
            "value_index": 60,
            "label": "Yellow"
          }
        ],
        "product_id": 1769,
        "attribute_code": "color"
      },
      {
        "id": 301,
        "attribute_id": "142",
        "label": "Size",
        "position": 0,
        "values": [
          {
            "value_index": 167,
            "label": "XS"
          },
          {
            "value_index": 168,
            "label": "S"
          },
          {
            "value_index": 169,
            "label": "M"
          },
          {
            "value_index": 170,
            "label": "L"
          },
          {
            "value_index": 171,
            "label": "XL"
          }
        ],
        "product_id": 1769,
        "attribute_code": "size"
      }
    ],
```

This collection contains all configurable options that can be used to identify the `simple` product, assigned in the `configurable_children` collection. Usually it's a set of available `colors` and `sizes`. It's being used to construct the Color/Size switcher on `Product.vue` page. If you set the proper `label`'s then the `attribute_id` is not required. It means you don't have to have the [attribute defined in the dictionary](Format-attribute.md). It's pretty usefull option for the platforms that doesn't support attribute dictionaries like [BigCommerce](https://github.com/DivanteLtd/bigcommerce2vuestorefront/blob/42efbb05aef1f37bfb944910b662d39c5de5e37a/src/templates/product.js#L90).

```json
    "stock": [
      {
        "is_in_stock": true,
        "qty": 0
      }
    ],
```

Stock is being used to check if the product is available or not. There is also a `api/stock` endpoint (to be implemented dynamically) to make sure the Vue Storefront is up to date with the data. This Elastic based stock is used mostly for filtering out unavailable products (and not as a source of truth for adding to the cart).


```json
    "configurable_children": [
      {
        "type_id": null,
        "sku": "WT06-XS-Blue",
        "special_price": 0,
        "special_to_date": null,
        "special_from_date": null,
        "name": "Chloe Compete Tank-XS-Blue - tier price",
        "price": 39,
        "price_incl_tax": null,
        "special_price_incl_tax": null,
        "id": 1754,
        "image": "/w/t/wt06-blue_main.jpg",
        "url_key": "chloe-compete-tank-xs-blue",
        "url_path": null,
        "status": 1,
        "size": "167",
        "color": "50"
      },
      {
        "type_id": null,
        "sku": "WT06-XS-Red",
        "special_price": 0,
        "special_to_date": null,
        "special_from_date": null,
        "name": "Chloe Compete Tank-XS-Red",
        "price": 39,
        "price_incl_tax": null,
        "special_price_incl_tax": null,
        "id": 1755,
        "image": "/w/t/wt06-red_main.jpg",
        "url_key": "chloe-compete-tank-xs-red",
        "url_path": null,
        "status": 1,
        "size": "167",
        "color": "58"
      }
    ]
  },
  ```

  All `configurable` products consists of `simple` products assigned in the `configurable_childdren` collection. Those are the ones finally ordered. The important feature of `configurable_children` collection is that it should consist only the properties that differentiate these products from the main `configurable` one. Probably you could skip the `name`. It's because each product is being **merged** with it's `configurable_children` - well: selected configurable children when user is switching the color and sizes. There is a Vuex action `product/confgure` doing exactly this merge operation. 


### What was skipped?

We havent' described the Bundle and Grouped products. It's on our TODO :)