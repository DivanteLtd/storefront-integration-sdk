# Attribute entity

For supported attribute types (which are used in `frontend_input`),
please refer to [Magento Attribute Types Dev Docs](https://devdocs.magento.com/guides/m1x/api/soap/catalog/catalogProductAttribute/product_attribute.types.html)
However, only `multiselect` and `select` are currently used, every other type will be treated as if they were `text` and this is handled by `core/modules/catalog/components/ProductAttribute.ts` in vue-storefront.

## Adding attributes

To add new attribute to your custom API you need to know how you're going to use it.
In all cases you'll have to push new attribute specification to ElasticSearch.
Format may vary depending on how you want to use them, however here are the most common cases.

### 1. Simply show attribute on product page
In that case the atributes/index endpoint should have the attribute returned as:all you need to do is return the 
```json
{
            "attribute_code": "supplier_note",
            "frontend_input": "text",
            "frontend_label": "Supplier note",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 123,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": true,
            "position": 0,
            "id": 123,
            "options": []
        }
```
and then in the `products/index` product record:
```json
{
    (...)
    "supplier_note": "Keep away from the sun. Store in below 0 temperatures",
    (...)
}
```
Unless you didn't define the `supplier_note` format in vue-storefront `core/modules/catalog/types/Product.ts` The value 
can also be an empty string `""` or `null`. 

### 2. Use attribute to filter products
Checklist:

- For this to work, the filterable attribute `frontend_input` must be `select` in `attributes/index` endpoint
- the attribute in attributes/index endpoint must have `options` node which needs to look like this:
```json
"options": [
    {
        "value": 7,
        "label": "Pink"
    },
    {
        "value": 8,
        "label": "Gold"
    }
]
```
The value MUST BE `integer` type.

- the product record on `products/index` must have the attribute value as `integer` type that matches the attribute 
option `value` field. So... Pink product would have   
```json
{
  (...)
  "color": 7,
  (...)
}
```
and `7` will be later converted to "Pink" by vue-storefront logic.

- IF the product is `configurable` type:
```json
{
  (...)
  "type_id": "configurable",
  (...)
}
```
and the color defines the product children, the parent product should have color set to `null`, and the products 
within its `configurable_children` should have the `color` value set.

- If the product has children which are defined by color. Parent product should additionally have `color_options` 
node that defines color Ids of its children, e.g. if the product is available in pink and gold, it should have:
```json
"color_options": [
    7,
    8
]
```
returned in it, where one row (Pink colored child) in `configurable_children` has  
```json
    "color": 7,
```
and the other (Gold colored child) has
```json
    "color": 8,
```
- if the product doesn't have the `color` set or available, the attribute should still be returned and the value 
 should be `null`