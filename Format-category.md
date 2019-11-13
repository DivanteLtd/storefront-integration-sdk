## Category entity

Please check the [sample-data/categories.json](sample-data/categories.json) to make sure which fields are trully crucial for Vue Storefront to work.

Remember - you can add any properties you like to the JSON objects to consume them on Vue Storefront level. Please just make sure you added the new property names to [the proper `includeFields` list for queries](https://github.com/DivanteLtd/vue-storefront/blob/bb6f8e70b5587ed73c457d382c7ac93bd14db413/config/default.json#L151).

Here we present the core purpose of the product properties:

```json
    "id": 24,
```
The type is undefined (it can be anything) - but must be unique. Category identifier used mostly for caching purposes (as a key)

```json
    "parent_id": 21,
```

If this is a child category please set the parent category id in here. This field is being used for building up the Breadcrumbs.

```json
    "path": "1/2/29",
```

This is string, list of IDs of the parent categories. Used to build the breadcrumbs more easily.

```json
    "name": "Hoodies & Sweatshirts",
```

This is just a category name.

```json
    "url_key": "hoodies-and-sweatshirts-24",
    "url_path": "women/tops-women/hoodies-and-sweatshirts-women/hoodies-and-sweatshirts-24",
    "slug": "hoodies-and-sweatshirts-24"
```

```json
    "is_active": true,
```

If it's false - the category won't be displayed.

```json
    "position": 2,
```

Sorting position of the category on it's level

```json
  "level": 4,
```

The category level in the tree. By default Vue Storefront is displaying categories witht `level: 2` in the main menu.

```json
    "product_count": 182,
```

If it's false - the category won't be displayed.

```json
    "children_data": [
      {
        "id": 27,
        "children_data": []
      },
      {
        "id": 28,
        "children_data": []
      }
    ]
```

This is the children structure. It's being used for cosntructing the queries to get the child products.
