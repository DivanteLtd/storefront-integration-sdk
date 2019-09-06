# API docs for Vue Storefront

To integrate the [vue-storefront](https://github.com/DivanteLtd/vue-storefront) with third party platform You should start with building the API around the platform. It should be compatible with the following specification to let Vue Storefront app seamlesly use it and process the data.

The example implementation references/links are provided for the Magento1 module.

**This is general purpose API** for 3rd party platform integration with Vue Storefront.

Some endpoints (`attributes`, `categories`, `products`, `taxrules`) returns data that can be directly stored to ElasticSearch by [node-app](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/tree/master/2.%20Use%20node-app%20to%20import%20the%20data/node-app) and used for catalog rendering, while others are used by [vue-storefront](https://github.com/DivanteLtd/vue-storefront) to proxy the dynamic requests (orders, cart, user account sync).

## Static endpoints for product catalog indexation by [node-app](https://github.com/DivanteLtd/magento1-vsbridge/tree/master/node-app)

### POST [/vsbridge/auth/admin](https://github.com/DivanteLtd/magento1-vsbridge/blob/154a51248bb1acbfffa0c270dae45a7e87cc6492/magento1-module/app/code/local/Divante/VueStorefrontBridge/controllers/AuthController.php#L6)
This method is used to get the admin user token used for subsequent catalog request authorization

#### REQUEST BODY:

```json
{ 
  "username": "admin",
  "password": "password123"
}
```

#### EXAMPLE CALL:

```bash
curl -X POST \
  http://dockerized-magento.local/vsbridge/auth/admin \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{ 
  "username": "admin",
  "password": "password123"
}'
```

#### RESPONSE BODY:

```json
{
    "code": 200,
    "result": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcifQ.AsjbrBmU7phdYo6aXtSx2QI4bmY5ugz4zTUBmiXTsbs"
}
```


### GET [/vsbridge/attributes/index](https://github.com/DivanteLtd/magento1-vsbridge/blob/154a51248bb1acbfffa0c270dae45a7e87cc6492/magento1-module/app/code/local/Divante/VueStorefrontBridge/controllers/AttributesController.php#L5)
This method is used to get all the attributes from Magento

#### GET PARAMS
`apikey` - authorization key provided by `/vsbridge/auth/admin` endpoint

#### EXAMPLE CALL:

```bash
curl -X GET \
  'http://dockerized-magento.local/vsbridge/attributes/index?apikey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcifQ.AsjbrBmU7phdYo6aXtSx2QI4bmY5ugz4zTUBmiXTsbs&pageSize=1' \
  -H 'cache-control: no-cache'
```

#### RESPONSE BODY:

```json
{
    "code": 200,
    "result": [
        {
            "attribute_code": "accessories_size",
            "frontend_input": "select",
            "frontend_label": "Accessories Size",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 194,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": false,
            "position": 0,
            "id": 194,
            "options": [
                {
                    "value": 168,
                    "label": "L"
                },
                {
                    "value": 167,
                    "label": "M"
                },
                {
                    "value": 166,
                    "label": "S"
                },
                {
                    "value": 169,
                    "label": "XL"
                }
            ]
        },
        {
            "attribute_code": "apparel_type",
            "frontend_input": "select",
            "frontend_label": "Type",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 176,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": true,
            "position": 0,
            "id": 176,
            "options": [
                {
                    "value": 211,
                    "label": "Blazers"
                },
                {
                    "value": 34,
                    "label": "Blouses"
                },
                {
                    "value": 36,
                    "label": "Denim"
                },
                {
                    "value": 33,
                    "label": "Dresses"
                },
                {
                    "value": 39,
                    "label": "Knits"
                },
                {
                    "value": 227,
                    "label": "Outerwear"
                },
                {
                    "value": 37,
                    "label": "Pants"
                },
                {
                    "value": 38,
                    "label": "Polos"
                },
                {
                    "value": 41,
                    "label": "Shirts"
                },
                {
                    "value": 32,
                    "label": "Skirts"
                },
                {
                    "value": 40,
                    "label": "Tees"
                },
                {
                    "value": 35,
                    "label": "Tops"
                }
            ]
        },
        {
            "attribute_code": "author_artist",
            "frontend_input": "textarea",
            "frontend_label": "Author/Artist",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 202,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": true,
            "position": 0,
            "id": 202,
            "options": []
        },
        {
            "attribute_code": "bed_bath_type",
            "frontend_input": "select",
            "frontend_label": "Bed & Bath Type",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 198,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": true,
            "position": 0,
            "id": 198,
            "options": [
                {
                    "value": 185,
                    "label": "Bath"
                },
                {
                    "value": 184,
                    "label": "Bed"
                }
            ]
        },
        {
            "attribute_code": "books_music_type",
            "frontend_input": "select",
            "frontend_label": "Books & Music Type",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 208,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": true,
            "position": 0,
            "id": 208,
            "options": [
                {
                    "value": 210,
                    "label": "Books"
                },
                {
                    "value": 209,
                    "label": "Music"
                }
            ]
        },
        {
            "attribute_code": "camera_type",
            "frontend_input": "select",
            "frontend_label": "Camera Type",
            "is_user_defined": true,
            "is_unique": false,
            "attribute_id": 195,
            "is_visible": true,
            "is_comparable": false,
            "is_visible_on_front": false,
            "position": 0,
            "id": 195,
            "options": [
                {
                    "value": 171,
                    "label": "Compact"
                },
                {
                    "value": 172,
                    "label": "Digital SLRs"
                },
                {
                    "value": 170,
                    "label": "point & shoot"
                },
                {
                    "value": 173,
                    "label": "Underwater"
                }
            ]
        }
    ]
}
```

### GET [/vsbridge/categories/index](https://github.com/DivanteLtd/magento1-vsbridge/blob/154a51248bb1acbfffa0c270dae45a7e87cc6492/magento1-module/app/code/local/Divante/VueStorefrontBridge/controllers/CategoriesController.php#L30)
This method is used to get all the categories from Magento

:exclamation: Note: while this method should return the full category tree, it won't work out out of the box with vue-storefront [SidebarMenu.js](https://github.com/DivanteLtd/vue-storefront/blob/master/core/components/blocks/SidebarMenu/SidebarMenu.js). It requires you the first node to have level of `2` contrary to level `0` in example below.

#### GET PARAMS
`apikey` - authorization key provided by `/vsbridge/auth/admin` endpoint
`pageSize` - number of records to be returned
`page` - number of current page

#### EXAMPLE CALL:

```bash
curl -X GET \
  'http://dockerized-magento.local/vsbridge/categories/index?apikey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcifQ.AsjbrBmU7phdYo6aXtSx2QI4bmY5ugz4zTUBmiXTsbs&pageSize=1' \
  -H 'cache-control: no-cache' \
```

#### RESPONSE BODY:

```json
{
    "code": 200,
    "result": [
        {
            "parent_id": 0,
            "created_at": "2013-01-14 10:12:53",
            "updated_at": "2013-01-14 10:12:53",
            "position": 0,
            "level": 0,
            "children_count": 1,
            "available_sort_by": null,
            "include_in_menu": 1,
            "name": "Root Catalog",
            "id": 1,
            "children_data": [
                {
                    "parent_id": 1,
                    "created_at": "2013-01-14 10:12:53",
                    "updated_at": "2013-05-15 22:43:57",
                    "position": 1,
                    "level": 1,
                    "children_count": 6,
                    "request_path": null,
                    "is_active": true,
                    "name": "Default Category",
                    "is_anchor": false,
                    "id": 2,
                    "children_data": [
                        {
                            "parent_id": 2,
                            "created_at": "2013-01-25 10:43:31",
                            "updated_at": "2013-05-15 22:50:23",
                            "position": 2,
                            "level": 2,
                            "children_count": 4,
                            "request_path": "women.html",
                            "is_active": true,
                            "name": "Women",
                            "url_key": "women",
                            "is_anchor": true,
                            "id": 4,
                            "children_data": [
                                {
                                    "parent_id": 4,
                                    "created_at": "2013-01-25 10:56:08",
                                    "updated_at": "2014-03-07 15:01:55",
                                    "position": 1,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "women/new-arrivals.html",
                                    "is_active": true,
                                    "name": "New Arrivals",
                                    "url_key": "new-arrivals",
                                    "is_anchor": true,
                                    "id": 10,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 4,
                                    "created_at": "2013-01-25 10:57:32",
                                    "updated_at": "2014-11-22 23:50:26",
                                    "position": 2,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "women/tops-blouses.html",
                                    "is_active": true,
                                    "name": "Tops & Blouses",
                                    "url_key": "tops-blouses",
                                    "is_anchor": true,
                                    "id": 11,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 4,
                                    "created_at": "2013-01-25 10:58:32",
                                    "updated_at": "2013-05-06 04:11:20",
                                    "position": 3,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "women/pants-denim.html",
                                    "is_active": true,
                                    "name": "Pants & Denim",
                                    "url_key": "pants-denim",
                                    "is_anchor": true,
                                    "id": 12,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 4,
                                    "created_at": "2013-01-25 10:59:21",
                                    "updated_at": "2013-03-05 04:45:24",
                                    "position": 4,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "women/dresses-skirts.html",
                                    "is_active": true,
                                    "name": "Dresses & Skirts",
                                    "url_key": "dresses-skirts",
                                    "is_anchor": true,
                                    "id": 13,
                                    "children_data": []
                                }
                            ]
                        },
                        {
                            "parent_id": 2,
                            "created_at": "2013-01-25 10:44:47",
                            "updated_at": "2013-05-08 05:20:07",
                            "position": 3,
                            "level": 2,
                            "children_count": 5,
                            "request_path": "men.html",
                            "is_active": true,
                            "name": "Men",
                            "url_key": "men",
                            "is_anchor": true,
                            "id": 5,
                            "children_data": [
                                {
                                    "parent_id": 5,
                                    "created_at": "2013-01-25 11:01:03",
                                    "updated_at": "2013-05-06 04:12:42",
                                    "position": 1,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "men/new-arrivals.html",
                                    "is_active": true,
                                    "name": "New Arrivals",
                                    "url_key": "new-arrivals",
                                    "is_anchor": true,
                                    "id": 14,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 5,
                                    "created_at": "2013-01-25 11:01:28",
                                    "updated_at": "2014-11-23 00:08:20",
                                    "position": 2,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "men/shirts.html",
                                    "is_active": true,
                                    "name": "Shirts",
                                    "url_key": "shirts",
                                    "is_anchor": true,
                                    "id": 15,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 5,
                                    "created_at": "2013-01-25 11:03:19",
                                    "updated_at": "2013-04-16 08:52:47",
                                    "position": 3,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "men/tees-knits-and-polos.html",
                                    "is_active": true,
                                    "name": "Tees, Knits and Polos",
                                    "url_key": "tees-knits-and-polos",
                                    "is_anchor": true,
                                    "id": 16,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 5,
                                    "created_at": "2013-01-25 11:03:48",
                                    "updated_at": "2013-03-05 07:15:31",
                                    "position": 4,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "men/pants-denim.html",
                                    "is_active": true,
                                    "name": "Pants & Denim",
                                    "url_key": "pants-denim",
                                    "is_anchor": true,
                                    "id": 17,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 5,
                                    "created_at": "2013-11-04 03:18:58",
                                    "updated_at": "2014-11-21 02:27:50",
                                    "position": 5,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "men/blazers.html",
                                    "is_active": true,
                                    "name": "Blazers",
                                    "url_key": "blazers",
                                    "is_anchor": false,
                                    "id": 40,
                                    "children_data": []
                                }
                            ]
                        },
                        {
                            "parent_id": 2,
                            "created_at": "2013-01-25 10:47:41",
                            "updated_at": "2013-12-25 12:28:34",
                            "position": 4,
                            "level": 2,
                            "children_count": 4,
                            "request_path": "accessories.html",
                            "is_active": true,
                            "name": "Accessories",
                            "url_key": "accessories",
                            "is_anchor": true,
                            "id": 6,
                            "children_data": [
                                {
                                    "parent_id": 6,
                                    "created_at": "2013-01-25 11:04:27",
                                    "updated_at": "2013-03-05 07:16:27",
                                    "position": 1,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "accessories/eyewear.html",
                                    "is_active": true,
                                    "name": "Eyewear",
                                    "url_key": "eyewear",
                                    "is_anchor": true,
                                    "id": 18,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 6,
                                    "created_at": "2013-01-25 11:05:03",
                                    "updated_at": "2013-03-05 07:16:42",
                                    "position": 2,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "accessories/jewelry.html",
                                    "is_active": true,
                                    "name": "Jewelry",
                                    "url_key": "jewelry",
                                    "is_anchor": true,
                                    "id": 19,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 6,
                                    "created_at": "2013-01-25 11:06:05",
                                    "updated_at": "2013-05-08 05:21:45",
                                    "position": 3,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "accessories/shoes.html",
                                    "is_active": true,
                                    "name": "Shoes",
                                    "url_key": "shoes",
                                    "is_anchor": true,
                                    "id": 20,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 6,
                                    "created_at": "2013-01-25 11:07:12",
                                    "updated_at": "2013-03-05 07:17:10",
                                    "position": 4,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "accessories/bags-luggage.html",
                                    "is_active": true,
                                    "name": "Bags & Luggage",
                                    "url_key": "bags-luggage",
                                    "is_anchor": true,
                                    "id": 21,
                                    "children_data": []
                                }
                            ]
                        },
                        {
                            "parent_id": 2,
                            "created_at": "2013-01-25 10:49:05",
                            "updated_at": "2013-05-08 05:26:34",
                            "position": 5,
                            "level": 2,
                            "children_count": 4,
                            "request_path": "home-decor.html",
                            "is_active": true,
                            "name": "Home & Decor",
                            "url_key": "home-decor",
                            "is_anchor": true,
                            "id": 7,
                            "children_data": [
                                {
                                    "parent_id": 7,
                                    "created_at": "2013-01-25 11:07:52",
                                    "updated_at": "2013-05-16 20:06:14",
                                    "position": 1,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "home-decor/books-music.html",
                                    "is_active": true,
                                    "name": "Books & Music",
                                    "url_key": "books-music",
                                    "is_anchor": true,
                                    "id": 22,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 7,
                                    "created_at": "2013-01-25 11:08:31",
                                    "updated_at": "2013-03-05 07:17:38",
                                    "position": 2,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "home-decor/bed-bath.html",
                                    "is_active": true,
                                    "name": "Bed & Bath",
                                    "url_key": "bed-bath",
                                    "is_anchor": true,
                                    "id": 23,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 7,
                                    "created_at": "2013-01-25 11:08:54",
                                    "updated_at": "2013-03-08 19:27:16",
                                    "position": 3,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "home-decor/electronics.html",
                                    "is_active": true,
                                    "name": "Electronics",
                                    "url_key": "electronics",
                                    "is_anchor": true,
                                    "id": 24,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 7,
                                    "created_at": "2013-01-25 11:10:06",
                                    "updated_at": "2013-03-29 22:54:12",
                                    "position": 4,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "home-decor/decorative-accents.html",
                                    "is_active": true,
                                    "name": "Decorative Accents",
                                    "url_key": "decorative-accents",
                                    "is_anchor": true,
                                    "id": 25,
                                    "children_data": []
                                }
                            ]
                        },
                        {
                            "parent_id": 2,
                            "created_at": "2013-01-25 10:49:50",
                            "updated_at": "2013-05-15 22:49:33",
                            "position": 6,
                            "level": 2,
                            "children_count": 4,
                            "request_path": "sale.html",
                            "is_active": true,
                            "name": "Sale",
                            "url_key": "sale",
                            "is_anchor": true,
                            "id": 8,
                            "children_data": [
                                {
                                    "parent_id": 8,
                                    "created_at": "2013-01-25 11:10:39",
                                    "updated_at": "2013-05-06 04:17:00",
                                    "position": 1,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "sale/women.html",
                                    "is_active": true,
                                    "name": "Women",
                                    "url_key": "women",
                                    "is_anchor": true,
                                    "id": 26,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 8,
                                    "created_at": "2013-01-25 11:11:07",
                                    "updated_at": "2013-05-06 04:17:12",
                                    "position": 2,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "sale/men.html",
                                    "is_active": true,
                                    "name": "Men",
                                    "url_key": "men",
                                    "is_anchor": true,
                                    "id": 27,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 8,
                                    "created_at": "2013-01-25 11:11:31",
                                    "updated_at": "2013-05-06 04:17:24",
                                    "position": 3,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "sale/accessories.html",
                                    "is_active": true,
                                    "name": "Accessories",
                                    "url_key": "accessories",
                                    "is_anchor": true,
                                    "id": 28,
                                    "children_data": []
                                },
                                {
                                    "parent_id": 8,
                                    "created_at": "2013-01-25 11:12:07",
                                    "updated_at": "2013-05-06 04:17:34",
                                    "position": 4,
                                    "level": 3,
                                    "children_count": 0,
                                    "request_path": "sale/home-decor.html",
                                    "is_active": true,
                                    "name": "Home & Decor",
                                    "url_key": "home-decor",
                                    "is_anchor": true,
                                    "id": 29,
                                    "children_data": []
                                }
                            ]
                        },
                        {
                            "parent_id": 2,
                            "created_at": "2013-01-25 10:50:47",
                            "updated_at": "2013-05-10 17:17:59",
                            "position": 7,
                            "level": 2,
                            "children_count": 0,
                            "request_path": "vip.html",
                            "is_active": true,
                            "name": "VIP",
                            "url_key": "vip",
                            "is_anchor": true,
                            "id": 9,
                            "children_data": []
                        }
                    ]
                }
            ]
        }
    ]
}
```


### GET [/vsbridge/taxrules/index](https://github.com/DivanteLtd/magento1-vsbridge/blob/154a51248bb1acbfffa0c270dae45a7e87cc6492/magento1-module/app/code/local/Divante/VueStorefrontBridge/controllers/TaxrulesController.php#L5)
This method is used to get all the tax rules from the backend

#### GET PARAMS
`apikey` - authorization key provided by `/vsbridge/auth/admin` endpoint
`pageSize` - number of records to be returned
`page` - number of current page

#### EXAMPLE CALL:

```bash
curl -X GET \
  'http://dockerized-magento.local/vsbridge/taxrules/index?apikey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcifQ.AsjbrBmU7phdYo6aXtSx2QI4bmY5ugz4zTUBmiXTsbs' \
  -H 'cache-control: no-cache' 
```

#### RESPONSE BODY:

```json
{
    "code": 200,
    "result": [
        {
            "code": "Retail Customer - Taxable Good - Rate 1",
            "priority": 1,
            "position": 0,
            "calculate_subtotal": 0,
            "id": 4,
            "tax_rates_ids": [
                16,
                24,
                19,
                23,
                18,
                20,
                22,
                17,
                21,
                33
            ],
            "product_tax_class_ids": [
                2
            ],
            "customer_tax_class_ids": [
                3,
                7,
                8
            ],
            "rates": [
                {
                    "tax_country_id": "US",
                    "tax_region_id": 12,
                    "tax_postcode": "*",
                    "code": "US-CA-*-Rate 1",
                    "rate": 9,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 16
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 14,
                    "tax_postcode": "*",
                    "code": "US-CT-*-Rate 1",
                    "rate": 6.98,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 24
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 18,
                    "tax_postcode": "*",
                    "code": "US-FL-*-Rate 1 ",
                    "rate": 7.85,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 19
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 23,
                    "tax_postcode": "*",
                    "code": "US-IL-*-Rate 1",
                    "rate": 7.8,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 23
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 32,
                    "tax_postcode": "*",
                    "code": "US-MA-*-Rate 1",
                    "rate": 7.95,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 18
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 33,
                    "tax_postcode": "*",
                    "code": "US-MI-*-Rate 1",
                    "rate": 7.748,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 20
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 41,
                    "tax_postcode": "*",
                    "code": "US-NJ-*-Rate 1",
                    "rate": 7,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 22
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 43,
                    "tax_postcode": "*",
                    "code": "US-NY-*-Rate 1",
                    "rate": 8.375,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 17
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 47,
                    "tax_postcode": "*",
                    "code": "US-OH-*-Rate 1",
                    "rate": 5.5,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 21
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 57,
                    "tax_postcode": "*",
                    "code": "US-TX-*-Rate 1",
                    "rate": 5.879,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 33
                }
            ]
        },
        {
            "code": "Wholesale Customer - Tax Exempt ",
            "priority": 0,
            "position": 0,
            "calculate_subtotal": 0,
            "id": 5,
            "tax_rates_ids": [
                7
            ],
            "product_tax_class_ids": [
                6
            ],
            "customer_tax_class_ids": [
                5
            ],
            "rates": [
                {
                    "tax_country_id": "US",
                    "tax_region_id": 0,
                    "tax_postcode": "*",
                    "code": "US-All States-WholesaleTaxExemptRate",
                    "rate": 0,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 7
                }
            ]
        },
        {
            "code": "Private Sales - Shipping Taxes",
            "priority": 0,
            "position": 0,
            "calculate_subtotal": 0,
            "id": 10,
            "tax_rates_ids": [
                12
            ],
            "product_tax_class_ids": [
                4
            ],
            "customer_tax_class_ids": [
                9
            ],
            "rates": [
                {
                    "tax_country_id": "US",
                    "tax_region_id": 0,
                    "tax_postcode": "*",
                    "code": "US-All States-PrivateSalesShippingRate",
                    "rate": 4.92,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 12
                }
            ]
        },
        {
            "code": "Private Sales - Taxable Goods - Rate 2",
            "priority": 0,
            "position": 0,
            "calculate_subtotal": 0,
            "id": 11,
            "tax_rates_ids": [
                25,
                27,
                34,
                35,
                29,
                32,
                30,
                28,
                31,
                26
            ],
            "product_tax_class_ids": [
                2
            ],
            "customer_tax_class_ids": [
                9
            ],
            "rates": [
                {
                    "tax_country_id": "US",
                    "tax_region_id": 12,
                    "tax_postcode": "*",
                    "code": "US-CA-*-Rate 2",
                    "rate": 8.36,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 25
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 14,
                    "tax_postcode": "*",
                    "code": "US-CT-*-Rate 2",
                    "rate": 6,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 27
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 18,
                    "tax_postcode": "*",
                    "code": "US-FL-*-Rate 2",
                    "rate": 8.4,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 34
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 23,
                    "tax_postcode": "*",
                    "code": "US-IL-*-Rate 2",
                    "rate": 6.9,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 35
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 32,
                    "tax_postcode": "*",
                    "code": "US-MA-*-Rate 2",
                    "rate": 7.987,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 29
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 33,
                    "tax_postcode": "*",
                    "code": "US-MI-*-Rate 2",
                    "rate": 6.72,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 32
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 41,
                    "tax_postcode": "*",
                    "code": "US-NJ-*-Rate 2",
                    "rate": 7.67,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 30
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 43,
                    "tax_postcode": "*",
                    "code": "US-NY-*-Rate 2",
                    "rate": 8.78,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 28
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 47,
                    "tax_postcode": "*",
                    "code": "US-OH-*-Rate 2",
                    "rate": 6,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 31
                },
                {
                    "tax_country_id": "US",
                    "tax_region_id": 57,
                    "tax_postcode": "*",
                    "code": "US-TX-*-Rate 2",
                    "rate": 5.7,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 26
                }
            ]
        },
        {
            "code": "Not Logged In - Taxable Goods",
            "priority": 0,
            "position": 0,
            "calculate_subtotal": 0,
            "id": 13,
            "tax_rates_ids": [
                15
            ],
            "product_tax_class_ids": [
                2
            ],
            "customer_tax_class_ids": [
                10
            ],
            "rates": [
                {
                    "tax_country_id": "US",
                    "tax_region_id": 0,
                    "tax_postcode": "*",
                    "code": "US-All States-TaxableGoodsRate",
                    "rate": 8.25,
                    "zip_is_range": null,
                    "zip_from": null,
                    "zip_to": null,
                    "id": 15
                }
            ]
        }
    ]
}
```

### GET [/vsbridge/products/index](https://github.com/DivanteLtd/magento1-vsbridge/blob/154a51248bb1acbfffa0c270dae45a7e87cc6492/magento1-module/app/code/local/Divante/VueStorefrontBridge/controllers/ProductsController.php#L6)
This method is used to get all the products from the backend

**Note**: The response below contains only attributes required for vue-storefront to work.
If you need to define more attributes, check out: 
[Product Attributes](https%3A%2F%2Fgithub.com%2FDivanteLtd%2Fvue-storefront-integration-boilerplate%2Fblob%2Fmaster%2F1.%20Expose%20the%20API%20endpoints%20required%20by%20VS%2FProduct%20Attributes.md)

#### GET PARAMS
`apikey` - authorization key provided by `/vsbridge/auth/admin` endpoint
`pageSize` - number of records to be returned
`page` - number of current page

#### EXAMPLE CALL:

```bash
curl -X GET \
  'http://dockerized-magento.local/vsbridge/products/index?apikey=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjcifQ.AsjbrBmU7phdYo6aXtSx2QI4bmY5ugz4zTUBmiXTsbs&pageSize=20' \
  -H 'cache-control: no-cache'
```

#### RESPONSE BODY:

```json
{
    "code": 200,
    "result": [
        {
            "type_id": "simple",
            "sku": "abl004",
            "created_at": "2013-04-04 05:48:18",
            "updated_at": "2014-11-24 10:29:12",
            "color": null,
            "status": 1,
            "accessories_size": null,
            "visibility": 4,
            "tax_class_id": 2,
            "description": "Leather. 4\" x 6.5\" x 0.5\"",
            "meta_keyword": null,
            "short_description": "Just the right size for your passport, tickets and other essentials, this leather wallet is the perfect travel carry all.",
            "name": "Houston Travel Wallet",
            "meta_title": null,
            "image": "/a/b/abl004a_1.jpg",
            "gift_message_available": null,
            "gift_wrapping_available": 0,
            "meta_description": null,
            "media_gallery" : [
                {
                    "id": 2406,
                    "image": "https://via.placeholder.com/1024x1024.png"
                },
                {
                    "id": 2405,
                    "image": "https://via.placeholder.com/1024x1024.png"
                }
            ],
            "url_key": "rolls-travel-wallet",
            "url_path": "rolls-travel-wallet.html",
            "price": 210,
            "final_price": 210,
            "special_price": null,
            "news_from_date": null,
            "news_to_date": null,
            "special_from_date": null,
            "special_to_date": null,
            "stock_item": {},
            "id": 374,
            "category": [
                {
                    "category_id": 9,
                    "name": "VIP"
                },
                {
                    "category_id": 21,
                    "name": "Bags & Luggage"
                }
            ],
            "category_ids": [
                9,
                21
            ],
            "stock":{
                "is_in_stock": true
            }
        },
        {
            "type_id": "simple",
            "sku": "abl003",
            "created_at": "2013-04-04 05:48:18",
            "updated_at": "2014-11-24 10:28:33",
            "color": 20,
            "status": 1,
            "accessories_size": null,
            "visibility": 4,
            "tax_class_id": 2,
            "description": "Leather, with flap closure. Padded carrying handles. Main compartment has padded laptop pocket, file section and organizer panel. Quick access back pocket. Padded adjustable shoulder strap. 16\" x 12\" x 3.5\". Domestic.",
            "meta_keyword": null,
            "short_description": "Make an impression at overseas business meetings.",
            "name": "Broad St. Flapover Briefcase",
            "meta_title": null,
            "image": "/a/b/abl003b_1.jpg",
            "gift_message_available": null,
            "gift_wrapping_available": 0,
            "meta_description": null,
            "media_gallery" : [
                {
                    "id": 2406,
                    "image": "https://via.placeholder.com/1024x1024.png"
                },
                {
                    "id": 2405,
                    "image": "https://via.placeholder.com/1024x1024.png"
                }
            ],
            "url_key": "flapover-briefcase",
            "url_path": "flapover-briefcase.html",
            "price": 570,
            "final_price": 570,
            "special_price": null,
            "news_from_date": null,
            "news_to_date": null,
            "special_from_date": null,
            "special_to_date": null,
            "stock_item": {},
            "id": 373,
            "category": [
                {
                    "category_id": 9,
                    "name": "VIP"
                },
                {
                    "category_id": 21,
                    "name": "Bags & Luggage"
                }
            ],
            "category_ids": [
                9,
                21 
            ],
            "stock":{    
                "is_in_stock": true
            }
        },
        {
            "type_id": "configurable",
            "sku": "mpd000c",
            "created_at": "2013-05-03 20:06:20",
            "updated_at": "2014-11-23 00:12:49",
            "status": 1,
            "visibility": 4,
            "tax_class_id": 2,
            "apparel_type": 37,
            "color": null,
            "size": null,
            "description": "Straight leg chino. Back pockets with button closure. 14\" leg opening. Zip fly. 100% cotton.",
            "short_description": "The slim and trim Bowery is a wear-to-work pant you'll actually want to wear. A clean style in our crisp, compact cotton twill, it's perfectly polished (but also comfortable enough for hanging out after hours).",
            "meta_keyword": null,
            "name": "Khaki Bowery Chino Pants",
            "url_key": "khaki-bowery-chino-pants",
            "meta_title": null,
            "meta_description": null,
            "image": "/m/p/mpd000t.jpg",
            "gift_message_available": null,
            "gift_wrapping_available": 0,
            "url_path": "khaki-bowery-chino-pants.html",
            "price": 140,
            "final_price": 140,
            "special_price": null,
            "news_from_date": null,
            "news_to_date": null,
            "special_from_date": null,
            "special_to_date": null,
            "stock_item": {},
            "id": 456,
            "configurable_children": [
                {
                    "sku": "mpd000",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 65,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants",
                    "url_path": "khaki-bowery-chino-pants-567.html",
                    "image": "/m/p/mpd000t_2.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd001",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 63,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants",
                    "url_path": "khaki-bowery-chino-pants-568.html",
                    "image": "/m/p/mpd000t_3.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd002",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 61,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants",
                    "url_path": "khaki-bowery-chino-pants-569.html",
                    "image": "/m/p/mpd000t_1.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd003",
                    "parent_id": 456,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 65,
                    "status": 1,
                    "length": null,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "name": "Bowery Chino Pants",
                    "image": "/m/p/mpd003t_2.jpg",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "media_gallery" : [
                        {
                            "id": 2406,
                            "image": "https://via.placeholder.com/1024x1024.png"
                        },
                        {
                            "id": 2405,
                            "image": "https://via.placeholder.com/1024x1024.png"
                        }
                    ],
                    "url_key": "bowery-chino-pants",
                    "url_path": "bowery-chino-pants.html",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd004",
                    "parent_id": 456,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 63,
                    "status": 1,
                    "length": null,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "name": "Bowery Chino Pants",
                    "image": "/m/p/mpd003t_3.jpg",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "media_gallery" : [
                        {
                            "id": 2406,
                            "image": "https://via.placeholder.com/1024x1024.png"
                        },
                        {
                            "id": 2405,
                            "image": "https://via.placeholder.com/1024x1024.png"
                        }
                    ],
                    "url_key": "bowery-chino-pants",
                    "url_path": "bowery-chino-pants-549.html",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd005",
                    "parent_id": 456,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 61,
                    "status": 1,
                    "length": null,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "name": "Bowery Chino Pants",
                    "image": "/m/p/mpd003t_4.jpg",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "media_gallery" : [
                        {
                            "id": 2406,
                            "image": "https://via.placeholder.com/1024x1024.png"
                        },
                        {
                            "id": 2405,
                            "image": "https://via.placeholder.com/1024x1024.png"
                        }
                    ],
                    "url_key": "bowery-chino-pants",
                    "url_path": "bowery-chino-pants-550.html",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00338",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 58,
                    "length": null,
                    "name": "Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "bowery-chino-pants-charcoal-38",
                    "url_path": "bowery-chino-pants-charcoal-38.html",
                    "image": "/m/p/mpd003t_6.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00331",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 64,
                    "length": null,
                    "name": "Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "bowery-chino-pants-charcoal-31",
                    "url_path": "bowery-chino-pants-charcoal-31.html",
                    "image": "/m/p/mpd003t_7.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": false,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00328",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 67,
                    "length": null,
                    "name": "Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "bowery-chino-pants",
                    "url_path": "bowery-chino-pants-553.html",
                    "image": "/m/p/mpd003t_8.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00336",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 17,
                    "apparel_type": 37,
                    "size": 59,
                    "length": null,
                    "name": "Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "bowery-chino-pants",
                    "url_path": "bowery-chino-pants-552.html",
                    "image": "/m/p/mpd003t_5.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00028",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 67,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants-khaki-28",
                    "url_path": "khaki-bowery-chino-pants-khaki-28.html",
                    "image": "/m/p/mpd000t_4.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00031",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 64,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants",
                    "url_path": "khaki-bowery-chino-pants-570.html",
                    "image": "/m/p/mpd000t_5.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00036",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 59,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants",
                    "url_path": "khaki-bowery-chino-pants-571.html",
                    "image": "/m/p/mpd000t_6.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                },
                {
                    "sku": "mpd00038",
                    "parent_id": 456,
                    "status": 1,
                    "visibility": 1,
                    "tax_class_id": 2,
                    "color": 25,
                    "apparel_type": 37,
                    "size": 58,
                    "length": null,
                    "name": "Khaki Bowery Chino Pants",
                    "gift_message_available": null,
                    "gift_wrapping_available": null,
                    "url_key": "khaki-bowery-chino-pants",
                    "url_path": "khaki-bowery-chino-pants-572.html",
                    "image": "/m/p/mpd000t_7.jpg",
                    "price": 140,
                    "final_price": 140,
                    "special_price": null,
                    "special_from_date": null,
                    "special_to_date": null,
                    "is_in_stock": true,
                    "stock":{
                        "is_in_stock": true
                    }
                }
            ],
            "configurable_options": [
                {
                    "id": 90,
                    "label": "Color",
                    "use_default": 0,
                    "position": 0,
                    "values": [
                        {
                            "product_super_attribute_id": 90,
                            "value_index": 17,
                            "label": "Charcoal",
                            "default_label": "Charcoal",
                            "store_label": "Charcoal",
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 5
                        },
                        {
                            "product_super_attribute_id": 90,
                            "value_index": 25,
                            "label": "Khaki",
                            "default_label": "Khaki",
                            "store_label": "Khaki",
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 11
                        }
                    ],
                    "attribute_id": 92,
                    "attribute_code": "color",
                    "frontend_label": "Color",
                    "store_label": "Color"
                },
                {
                    "id": 91,
                    "label": "Size",
                    "use_default": 0,
                    "position": 0,
                    "values": [
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 67,
                            "label": 28,
                            "default_label": 28,
                            "store_label": 28,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 40
                        },
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 65,
                            "label": 30,
                            "default_label": 30,
                            "store_label": 30,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 42
                        },
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 64,
                            "label": 31,
                            "default_label": 31,
                            "store_label": 31,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 43
                        },
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 63,
                            "label": 32,
                            "default_label": 32,
                            "store_label": 32,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 44
                        },
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 61,
                            "label": 34,
                            "default_label": 34,
                            "store_label": 34,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 46
                        },
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 59,
                            "label": 36,
                            "default_label": 36,
                            "store_label": 36,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 48
                        },
                        {
                            "product_super_attribute_id": 91,
                            "value_index": 58,
                            "label": 38,
                            "default_label": 38,
                            "store_label": 38,
                            "is_percent": 0,
                            "pricing_value": null,
                            "use_default_value": true,
                            "order": 49
                        }
                    ],
                    "attribute_id": 180,
                    "attribute_code": "size",
                    "frontend_label": "Size",
                    "store_label": "Size"
                }
            ],
            "color_options": [
                17,
                25
            ],
            "size_options": [
                67,
                65,
                64,
                63,
                61,
                59,
                58
            ],
            "category": [
                {
                    "category_id": 5,
                    "name": "Men"
                },
                {
                    "category_id": 14,
                    "name": "New Arrivals"
                },
                {
                    "category_id": 17,
                    "name": "Pants & Denim"
                }
            ],
            "category_ids": [
                5,
                14,
                17
            ],
            "stock":{    
                "is_in_stock": true
            }
        }
    ]
}
```

## Dynamic requests for [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api)

**COMPATIBILITY:**
- Implemented in Vue Storefront Magento 2.x integration,
- TODO: Vue Storefront Magento 1.x integration

Vue Storefront is powered by vue-storefront-api data middleware. It's a REST service which unifies all the differences between eCommerce platforms under one, platform agnostic API. Please find more details about the project [on Github](http://github.com/DivanteLtd/vue-storefront-api).

Read more on:

- [3rd party platform integration with Vue Storefront](https://medium.com/@piotrkarwatka/how-to-connect-3rd-party-platform-to-vue-storefront-df9cb30779f6?source=user_profile---------18----------------)
- [Integrating Magento cart and orders](https://medium.com/@piotrkarwatka/vue-storefront-cart-totals-orders-integration-with-magento2-6fbe6860fcd?source=user_profile---------9----------------)

All methods accept and respond with `application/json` content type.

## Cart module

Cart module is in charge of creating the eCommerce backend shopping carts and synchronizing the items users have in Vue Storefront and eCommerce backend. For example it can synchronize Vue Storefront shopping cart with the Magento quotes.

### POST [/vsbridge/cart/create](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)

#### WHEN:

This method is called when new Vue Storefront shopping cart is created. First visit, page refresh, after user-authorization ... If the `token` GET parameter is provided it's called as logged-in user; if not - it's called as guest-user. To draw the difference - let's keep to Magento example. For guest user vue-storefront-api is subsequently operating on `/guest-carts` API endpoints and for authorized users on `/carts/` endpoints)

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/create' -X POST
```

For authorized user:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/create?token=xu8h02nd66yq0gaayj4x3kpqwity02or' -X POST
```


#### RESPONSE BODY:

For guest user

```
{
    "code": 200,
    "result": "a17b9b5fb9f56652b8280bb94c52cd93"
}
```

The `result` is a guest-cart id that should be used for all subsequent cart related operations as `?cartId=a17b9b5fb9f56652b8280bb94c52cd93`

For authorized user
```
{
    "code":200,
    "result":"81668"
}
```
The `result` is a cart-id that should be used for all subsequent cart related operations as `?cartId=81668`

#### RESPONSE CODES:

- `200` when success
- `500` in case of error


### GET [/vsbridge/cart/pull](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L131)

Method used to fetch the current server side shopping cart content, used mostly for synchronization purposes when `config.cart.synchronize=true`

#### WHEN:
This method is called just after any Vue Storefront cart modification to check if the server or client shopping cart items need to be updated. It gets the current list of the shopping cart items. The synchronization algorithm in VueStorefront determines if server or client items need to be updated and executes `api/cart/update` or `api/cart/delete` accordngly.

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)


#### RESPONSE BODY:
```json
{
  "code": 200,
  "result": [
    {
      "item_id": 66257,
      "sku": "WS08-M-Black",
      "qty": 1,
      "name": "Minerva LumaTech&trade; V-Tee",
      "price": 32,
      "product_type": "configurable",
      "quote_id": "dceac8e2172a1ff0cfba24d757653257",
      "product_option": {
        "extension_attributes": {
          "configurable_item_options": [
            {
              "option_id": "93",
              "option_value": 49
            },
            {
              "option_id": "142",
              "option_value": 169
            }
          ]
        }
      }
    },
    {
      "item_id": 66266,
      "sku": "WS08-XS-Red",
      "qty": 1,
      "name": "Minerva LumaTech&trade; V-Tee",
      "price": 32,
      "product_type": "configurable",
      "quote_id": "dceac8e2172a1ff0cfba24d757653257",
      "product_option": {
        "extension_attributes": {
          "configurable_item_options": [
            {
              "option_id": "93",
              "option_value": 58
            },
            {
              "option_id": "142",
              "option_value": 167
            }
          ]
        }
      }
    }
  ]
}

```


### POST [/vsbridge/cart/update](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L43)

Method used to add or update shopping cart item's server side. As a request body there should be JSON given representing the cart item. `sku` and `qty` are the two required options. If you like to update/edit server cart item You need to pass `item_id` identifier as well (can be obtainted from `api/cart/pull`)

#### WHEN:
This method is called just after `api/cart/pull` as a consequence of the synchronization process

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)

#### REQUEST BODY:

```json
{  
   "cartItem":{  
      "sku":"WS12-XS-Orange",
      "qty":1,
      "product_option":{  
         "extension_attributes":{  
            "custom_options":[  

            ],
            "configurable_item_options":[  
               {  
                  "option_id":"93",
                  "option_value":"56"
               },
               {  
                  "option_id":"142",
                  "option_value":"167"
               }
            ],
            "bundle_options":[  

            ]
         }
      },
      "quoteId":"0a8109552020cc80c99c54ad13ef5d5a"
   }
}
```

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/update?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"cartItem":{"sku":"MS10-XS-Black","item_id":5853,"quoteId":"81668"}}' --compressed
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":
    {
        "item_id":5853,
        "sku":"MS10-XS-Black",
        "qty":2,
        "name":"Logan  HeatTec&reg; Tee-XS-Black",
        "price":24,
        "product_type":"simple",
        "quote_id":"81668"
    }
}
```

### POST [/vsbridge/cart/delete](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L113)

This method is used to remove the shopping cart item on server side.

#### WHEN: 
This method is called just after `api/cart/pull` as a consequence of the synchronization process

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/delete?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"cartItem":{"sku":"MS10-XS-Black","item_id":5853,"quoteId":"81668"}}' --compressed
```

#### REQUEST BODY:

```json
{
    "cartItem":
    {
        "sku":"MS10-XS-Black",
        "item_id":5853,
        "quoteId":"81668"
    }
}
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":true
}
```

### POST [/vsbridge/cart/apply-coupon](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L63)

This method is used to apply the discount code to the current server side quote.

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/apply-coupon?token=2q1w9oixh3bukxyj947tiordnehai4td&cartId=5effb906a97ebecd6ae96e3958d04edc&coupon=ARMANI' -X POST -H 'content-type: application/json' -H 'accept: */*' 
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":true
}
```


### POST [/vsbridge/cart/delete-coupon](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L82)

This method is used to delete the discount code to the current server side quote.

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/delete-coupon?token=2q1w9oixh3bukxyj947tiordnehai4td&cartId=5effb906a97ebecd6ae96e3958d04edc' -X POST -H 'content-type: application/json' -H 'accept: */*' 
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":true
}
```

### GET [/vsbridge/cart/coupon](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L82)

This method is used to get the currently applied coupon code

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/coupon?token=2q1w9oixh3bukxyj947tiordnehai4td&cartId=5effb906a97ebecd6ae96e3958d04edc' -H 'content-type: application/json' -H 'accept: */*' 
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":"ARMANI"
}
```

### GET [/vsbridge/cart/totals](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L145)

Method called when the `config.synchronize_totals=true` just after any shopping cart modification. It's used to synchronize the Magento / other CMS totals after all promotion rules processed with current Vue Storefront state.

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/totals?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*'
```

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)

#### RESPONSE BODY:

You have totals data for the current, synchronized quote returned:

```json
{
    "code":200,
    "result":
        {
            "grand_total":0,
            "weee_tax_applied_amount":null,
            "base_currency_code":"USD",
            "quote_currency_code":"USD",
            "items_qty":1,
            "items":
                [
                    {
                        "item_id":5853,
                        "price":0,
                        "base_price":0,
                        "qty":1,
                        "row_total":0,
                        "base_row_total":0,
                        "row_total_with_discount":0,
                        "tax_amount":0,
                        "base_tax_amount":0,
                        "tax_percent":0,
                        "discount_amount":0,
                        "base_discount_amount":0,
                        "discount_percent":0,
                        "weee_tax_applied_amount":null,
                        "weee_tax_applied":null,
                        "name":"Logan  HeatTec&reg; Tee-XS-Black",
                        "options": "[{ \"label\": \"Color\", \"value\": \"red\" }, { \"label\": \"Size\", \"value\": \"XL\" }]",
                        "product_option":{  
                           "extension_attributes":{  
                              "custom_options":[  

                              ],
                              "configurable_item_options":[  
                                 {  
                                    "option_id":"93",
                                    "option_value":"56"
                                 },
                                 {  
                                    "option_id":"142",
                                    "option_value":"167"
                                 }
                              ],
                              "bundle_options":[  

                              ]
                           }    
                        }
                    }
                ],
            "total_segments":
                [
                    {
                        "code":"subtotal",
                        "title":"Subtotal",
                        "value":0
                    },
                    {
                        "code":"shipping",
                        "title":"Shipping & Handling",
                        "value":null
                    },
                    {
                        "code":"tax",
                        "title":"Tax",
                        "value":0,
                        "extension_attributes":
                            {
                                "tax_grandtotal_details":[]
                            }
                    },
                    {
                        "code":"grand_total",
                        "title":"Grand Total",
                        "value":null,
                        "area":"footer"
                    }
                ]
        }
}
```

### GET [/vsbridge/cart/payment-methods](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L178)

This method is used as a step in the cart synchronization process to get all the payment methods with actual costs as available inside the backend CMS

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/payment-methods?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*'
```

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)


#### RESPONSE BODY:

```json
{
    "code":200,
    "result":
        [
            {
                "code":"cashondelivery",
                "title":"Cash On Delivery"
            },
            {
                "code":"checkmo","title":
                "Check / Money order"
            },
            {
                "code":"free",
                "title":"No Payment Information Required"
            }
        ]
}
```

### POST [/vsbridge/cart/shipping-methods](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L160)

This method is used as a step in the cart synchronization process to get all the shipping methods with actual costs as available inside the backend CMS

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/shipping-methods?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"address":{"country_id":"PL"}}'
```

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)


#### REQUEST BODY:

If the shipping methods are dependend on the full address - probably we need to pass the whole address record with the same format as it's passed to `api/order/create` or `api/user/me`. The minimum required field is the `country_id`

```json
{
    "address":
    {
        "country_id":"PL"
    }
}
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":
    [
        {
            "carrier_code":"flatrate",
            "method_code":"flatrate",
            "carrier_title":"Flat Rate",
            "method_title":"Fixed",
            "amount":5,
            "base_amount":5
            ,"available":true,
            "error_message":"",
            "price_excl_tax":5,
            "price_incl_tax":5
        }
    ]
}
```

### POST [/vsbridge/cart/shipping-information](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L188)

This method sets the shipping information on specified quote which is a required step before calling `api/cart/collect-totals`

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/shipping-information?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"addressInformation":{"shipping_address":{"country_id":"PL"},"shipping_method_code":"flatrate","shipping_carrier_code":"flatrate"}}'
```

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)


#### REQUEST BODY:

```json
{
    "addressInformation":
    {
        "shipping_address":
        {
            "country_id":"PL"
        },
        "shipping_method_code":"flatrate",
        "shipping_carrier_code":"flatrate"
    }
}
```

#### RESPONSE BODY:

```json
{
  "code": 200,
  "result": {
    "payment_methods": [
      {
        "code": "cashondelivery",
        "title": "Cash On Delivery"
      },
      {
        "code": "checkmo",
        "title": "Check / Money order"
      }
    ],
    "totals": {
      "grand_total": 45.8,
      "base_grand_total": 55.18,
      "subtotal": 48,
      "base_subtotal": 48,
      "discount_amount": -8.86,
      "base_discount_amount": -8.86,
      "subtotal_with_discount": 39.14,
      "base_subtotal_with_discount": 39.14,
      "shipping_amount": 5,
      "base_shipping_amount": 5,
      "shipping_discount_amount": 0,
      "base_shipping_discount_amount": 0,
      "tax_amount": 9.38,
      "base_tax_amount": 9.38,
      "weee_tax_applied_amount": null,
      "shipping_tax_amount": 0,
      "base_shipping_tax_amount": 0,
      "subtotal_incl_tax": 59.04,
      "shipping_incl_tax": 5,
      "base_shipping_incl_tax": 5,
      "base_currency_code": "USD",
      "quote_currency_code": "USD",
      "items_qty": 2,
      "items": [
        {
          "item_id": 5853,
          "price": 24,
          "base_price": 24,
          "qty": 2,
          "row_total": 48,
          "base_row_total": 48,
          "row_total_with_discount": 0,
          "tax_amount": 9.38,
          "base_tax_amount": 9.38,
          "tax_percent": 23,
          "discount_amount": 8.86,
          "base_discount_amount": 8.86,
          "discount_percent": 15,
          "price_incl_tax": 29.52,
          "base_price_incl_tax": 29.52,
          "row_total_incl_tax": 59.04,
          "base_row_total_incl_tax": 59.04,
          "options": "[]",
          "weee_tax_applied_amount": null,
          "weee_tax_applied": null,
          "name": "Logan  HeatTec&reg; Tee-XS-Black"
        }
      ],
      "total_segments": [
        {
          "code": "subtotal",
          "title": "Subtotal",
          "value": 59.04
        },
        {
          "code": "shipping",
          "title": "Shipping & Handling (Flat Rate - Fixed)",
          "value": 5
        },
        {
          "code": "discount",
          "title": "Discount",
          "value": -8.86
        },
        {
          "code": "tax",
          "title": "Tax",
          "value": 9.38,
          "area": "taxes",
          "extension_attributes": {
            "tax_grandtotal_details": [
              {
                "amount": 9.38,
                "rates": [
                  {
                    "percent": "23",
                    "title": "VAT23"
                  }
                ],
                "group_id": 1
              }
            ]
          }
        },
        {
          "code": "grand_total",
          "title": "Grand Total",
          "value": 55.18,
          "area": "footer"
        }
      ]
    }
  }
}
```


### POST [/vsbridge/cart/collect-totals](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L212)

This method is called to update the quote totals just after the address information has been changed.

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/cart/collect-totals?token=xu8h02nd66yq0gaayj4x3kpqwity02or&cartId=81668' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"methods":{"paymentMethod":{"method":"cashondelivery"},"shippingCarrierCode":"flatrate","shippingMethodCode":"flatrate"}}'
```

#### GET PARAMS:
`token` - null OR user token obtained from [`/vsbridge/user/login`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)
`cartId` - numeric (integer) value for authorized user cart id or GUID (mixed string) for guest cart ID obtained from [`api/cart/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/cart.js#L26)


#### REQUEST BODY:

```json
{
  "methods": {
    "paymentMethod": {
      "method": "cashondelivery"
    },
    "shippingCarrierCode": "flatrate",
    "shippingMethodCode": "flatrate"
  }
}
```

#### RESPONSE BODY:

```json
{
  "code": 200,
  "result": {
    "grand_total": 45.8,
    "base_grand_total": 55.18,
    "subtotal": 48,
    "base_subtotal": 48,
    "discount_amount": -8.86,
    "base_discount_amount": -8.86,
    "subtotal_with_discount": 39.14,
    "base_subtotal_with_discount": 39.14,
    "shipping_amount": 5,
    "base_shipping_amount": 5,
    "shipping_discount_amount": 0,
    "base_shipping_discount_amount": 0,
    "tax_amount": 9.38,
    "base_tax_amount": 9.38,
    "weee_tax_applied_amount": null,
    "shipping_tax_amount": 0,
    "base_shipping_tax_amount": 0,
    "subtotal_incl_tax": 59.04,
    "base_subtotal_incl_tax": 59.04,
    "shipping_incl_tax": 5,
    "base_shipping_incl_tax": 5,
    "base_currency_code": "USD",
    "quote_currency_code": "USD",
    "items_qty": 2,
    "items": [
      {
        "item_id": 5853,
        "price": 24,
        "base_price": 24,
        "qty": 2,
        "row_total": 48,
        "base_row_total": 48,
        "row_total_with_discount": 0,
        "tax_amount": 9.38,
        "base_tax_amount": 9.38,
        "tax_percent": 23,
        "discount_amount": 8.86,
        "base_discount_amount": 8.86,
        "discount_percent": 15,
        "price_incl_tax": 29.52,
        "base_price_incl_tax": 29.52,
        "row_total_incl_tax": 59.04,
        "base_row_total_incl_tax": 59.04,
        "options": "[]",
        "weee_tax_applied_amount": null,
        "weee_tax_applied": null,
        "name": "Logan  HeatTec&reg; Tee-XS-Black"
      }
    ],
    "total_segments": [
      {
        "code": "subtotal",
        "title": "Subtotal",
        "value": 59.04
      },
      {
        "code": "shipping",
        "title": "Shipping & Handling (Flat Rate - Fixed)",
        "value": 5
      },
      {
        "code": "discount",
        "title": "Discount",
        "value": -8.86
      },
      {
        "code": "tax",
        "title": "Tax",
        "value": 9.38,
        "area": "taxes",
        "extension_attributes": {
          "tax_grandtotal_details": [
            {
              "amount": 9.38,
              "rates": [
                {
                  "percent": "23",
                  "title": "VAT23"
                }
              ],
              "group_id": 1
            }
          ]
        }
      },
      {
        "code": "grand_total",
        "title": "Grand Total",
        "value": 55.18,
        "area": "footer"
      }
    ]
  }
}
```

## User module

### POST [/vsbridge/user/create](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L25)

Registers new user to eCommerce backend users database. 

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/user/create' -H 'content-type: application/json' -H 'accept: application/json, text/plain, */*'--data-binary '{"customer":{"email":"pkarwatka9998@divante.pl","firstname":"Joe","lastname":"Black"},"password":"SecretPassword!@#123"}'
```

#### REQUEST BODY:

```json
{
  "customer": {
    "email": "pkarwatka9998@divante.pl",
    "firstname": "Joe",
    "lastname": "Black"
  },
  "password": "SecretPassword"
}
```

#### RESPONSE BODY:

In case of success

```json
{
  "code": 200,
  "result": {
    "id": 286,
    "group_id": 1,
    "created_at": "2018-04-03 13:35:13",
    "updated_at": "2018-04-03 13:35:13",
    "created_in": "Default Store View",
    "email": "pkarwatka9998@divante.pl",
    "firstname": "Joe",
    "lastname": "Black",
    "store_id": 1,
    "website_id": 1,
    "addresses": [],
    "disable_auto_group_change": 0
  }
}
```

In case of error:

```json
{
  "code": 500,
  "result": "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters."
}
```


### POST [/vsbridge/user/login](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L48)

Authorizes the user. It's called after user submits "Login" form inside the Vue Storefront app. It returns the user token which should be used for all subsequent API calls that requires authorization

#### GET PARAMS:

```
null
```

#### REQUEST BODY:

```json
{
    "username":"pkarwatka102@divante.pl",
    "password":"TopSecretPassword"}
```

#### RESPONSE BODY:

`curl 'https://your-domain.example.com/vsbridge/user/login' -H 'content-type: application/json' -H 'accept: application/json' --data-binary '"username":"pkarwatka102@divante.pl","password":"TopSecretPassword}'`

```json
{
    "code":200,
    "result":"xu8h02nd66yq0gaayj4x3kpqwity02or",
    "meta": { "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzOSJ9.a4HQc2HODmOj5SRMiv-EzWuMZbyIz0CLuVRhPw_MrOM" }
}
```

or in case of error:

```json
{
    "code":500,
    "result":"You did not sign in correctly or your account is temporarily disabled."
}
```

The result is a authorization token, that should be passed via `?token=xu8h02nd66yq0gaayj4x3kpqwity02or` GET param to all subsequent API calls that requires authorization

#### RESPONSE CODES:

- `200` when success
- `500` in case of error


### POST /vsbridge/user/refresh

Refresh the user token

#### GET PARAMS:

```
null
```

#### REQUEST BODY:

```json
{
    "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzOSJ9.a4HQc2HODmOj5SRMiv-EzWuMZbyIz0CLuVRhPw_MrOM"
}
```

#### RESPONSE BODY:

`curl 'https://your-domain.example.com/vsbridge/user/login' -H 'content-type: application/json' -H 'accept: application/json' --data-binary '"refreshToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEzOSJ9.a4HQc2HODmOj5SRMiv-EzWuMZbyIz0CLuVRhPw_MrOM"}'`

```json
{
    "code":200,
    "result":"xu8h02nd66yq0gaayj4x3kpqwity02or"
}
```

or in case of error:

```json
{
    "code":500,
    "result":"You did not sign in correctly or your account is temporarily disabled."
}
```

The result is a authorization token, that should be passed via `?token=xu8h02nd66yq0gaayj4x3kpqwity02or` GET param to all subsequent API calls that requires authorization

#### RESPONSE CODES:

- `200` when success
- `500` in case of error

### POST [/vsbridge/user/resetPassword](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L60)

Sends the password reset link for the specified user.

#### EXAMPLE CALL:

```bash
curl 'https://your-domain.example.com/vsbridge/user/resetPassword' -H 'content-type: application/json' -H 'accept: application/json, text/plain, */*' --data-binary '{"email":"pkarwatka992@divante.pl"}'
```

#### REQUEST BODY:

```json
{
  "email": "pkarwatka992@divante.pl"
}
```

#### RESPONSE BODY:

```json
{
  "code": 500,
  "result": "No such entity with email = pkarwatka992@divante.pl, websiteId = 1"
}
```


### POST [/vsbridge/user/changePassword](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L124)

This method is used to change password for current user identified by `token` obtained from `api/user/login`

#### GET PARAMS:

`token` - user token returned from `POST /vsbridge/user/login`

#### REQUEST BODY:

```json
{
    "currentPassword":"OldPassword",
    "newPassword":"NewPassword"
}
```


#### RESPONSE BODY:

```json
{
    "code":500,
    "result":"The password doesn't match this account."
}
```

### GET [/vsbridge/user/order-history](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L91)

Get the user order history from server side

#### GET PARAMS:

`token` - user token returned from `POST /vsbridge/user/login`

#### RESPONSE BODY:

```json
{
    "code": 200,
    "result": {
        "items": [
            {
                "applied_rule_ids": "1,5",
                "base_currency_code": "USD",
                "base_discount_amount": -3.3,
                "base_grand_total": 28,
                "base_discount_tax_compensation_amount": 0,
                "base_shipping_amount": 5,
                "base_shipping_discount_amount": 0,
                "base_shipping_incl_tax": 5,
                "base_shipping_tax_amount": 0,
                "base_subtotal": 22,
                "base_subtotal_incl_tax": 27.06,
                "base_tax_amount": 4.3,
                "base_total_due": 28,
                "base_to_global_rate": 1,
                "base_to_order_rate": 1,
                "billing_address_id": 204,
                "created_at": "2018-01-23 15:30:04",
                "customer_email": "pkarwatka28@example.com",
                "customer_group_id": 0,
                "customer_is_guest": 1,
                "customer_note_notify": 1,
                "discount_amount": -3.3,
                "email_sent": 1,
                "entity_id": 102,
                "global_currency_code": "USD",
                "grand_total": 28,
                "discount_tax_compensation_amount": 0,
                "increment_id": "000000102",
                "is_virtual": 0,
                "order_currency_code": "USD",
                "protect_code": "3984835d33abd2423b8a47efd0f74579",
                "quote_id": 1112,
                "shipping_amount": 5,
                "shipping_description": "Flat Rate - Fixed",
                "shipping_discount_amount": 0,
                "shipping_discount_tax_compensation_amount": 0,
                "shipping_incl_tax": 5,
                "shipping_tax_amount": 0,
                "state": "new",
                "status": "pending",
                "store_currency_code": "USD",
                "store_id": 1,
                "store_name": "Main Website\nMain Website Store\n",
                "store_to_base_rate": 0,
                "store_to_order_rate": 0,
                "subtotal": 22,
                "subtotal_incl_tax": 27.06,
                "tax_amount": 4.3,
                "total_due": 28,
                "total_item_count": 1,
                "total_qty_ordered": 1,
                "updated_at": "2018-01-23 15:30:05",
                "weight": 1,
                "items": [
                    {
                        "amount_refunded": 0,
                        "applied_rule_ids": "1,5",
                        "base_amount_refunded": 0,
                        "base_discount_amount": 3.3,
                        "base_discount_invoiced": 0,
                        "base_discount_tax_compensation_amount": 0,
                        "base_original_price": 22,
                        "base_price": 22,
                        "base_price_incl_tax": 27.06,
                        "base_row_invoiced": 0,
                        "base_row_total": 22,
                        "base_row_total_incl_tax": 27.06,
                        "base_tax_amount": 4.3,
                        "base_tax_invoiced": 0,
                        "created_at": "2018-01-23 15:30:04",
                        "discount_amount": 3.3,
                        "discount_invoiced": 0,
                        "discount_percent": 15,
                        "free_shipping": 0,
                        "discount_tax_compensation_amount": 0,
                        "is_qty_decimal": 0,
                        "is_virtual": 0,
                        "item_id": 224,
                        "name": "Radiant Tee-XS-Blue",
                        "no_discount": 0,
                        "order_id": 102,
                        "original_price": 22,
                        "price": 22,
                        "price_incl_tax": 27.06,
                        "product_id": 1546,
                        "product_type": "simple",
                        "qty_canceled": 0,
                        "qty_invoiced": 0,
                        "qty_ordered": 1,
                        "qty_refunded": 0,
                        "qty_shipped": 0,
                        "quote_item_id": 675,
                        "row_invoiced": 0,
                        "row_total": 22,
                        "row_total_incl_tax": 27.06,
                        "row_weight": 1,
                        "sku": "WS12-XS-Blue",
                        "store_id": 1,
                        "tax_amount": 4.3,
                        "tax_invoiced": 0,
                        "tax_percent": 23,
                        "updated_at": "2018-01-23 15:30:04",
                        "weight": 1
                    }
                ],
                "billing_address": {
                    "address_type": "billing",
                    "city": "Some city2",
                    "company": "Divante",
                    "country_id": "PL",
                    "email": "pkarwatka28@example.com",
                    "entity_id": 204,
                    "firstname": "Piotr",
                    "lastname": "Karwatka",
                    "parent_id": 102,
                    "postcode": "50-203",
                    "street": [
                        "XYZ",
                        "17"
                    ],
                    "telephone": null,
                    "vat_id": "PL8951930748"
                },
                "payment": {
                    "account_status": null,
                    "additional_information": [
                        "Cash On Delivery",
                        ""
                    ],
                    "amount_ordered": 28,
                    "base_amount_ordered": 28,
                    "base_shipping_amount": 5,
                    "cc_last4": null,
                    "entity_id": 102,
                    "method": "cashondelivery",
                    "parent_id": 102,
                    "shipping_amount": 5
                },
                "status_histories": [],
                "extension_attributes": {
                    "shipping_assignments": [
                        {
                            "shipping": {
                                "address": {
                                    "address_type": "shipping",
                                    "city": "Some city",
                                    "company": "NA",
                                    "country_id": "PL",
                                    "email": "pkarwatka28@example.com",
                                    "entity_id": 203,
                                    "firstname": "Piotr",
                                    "lastname": "Karwatka",
                                    "parent_id": 102,
                                    "postcode": "51-169",
                                    "street": [
                                        "XYZ",
                                        "13"
                                    ],
                                    "telephone": null
                                },
                                "method": "flatrate_flatrate",
                                "total": {
                                    "base_shipping_amount": 5,
                                    "base_shipping_discount_amount": 0,
                                    "base_shipping_incl_tax": 5,
                                    "base_shipping_tax_amount": 0,
                                    "shipping_amount": 5,
                                    "shipping_discount_amount": 0,
                                    "shipping_discount_tax_compensation_amount": 0,
                                    "shipping_incl_tax": 5,
                                    "shipping_tax_amount": 0
                                }
                            },
                            "items": [
                                {
                                    "amount_refunded": 0,
                                    "applied_rule_ids": "1,5",
                                    "base_amount_refunded": 0,
                                    "base_discount_amount": 3.3,
                                    "base_discount_invoiced": 0,
                                    "base_discount_tax_compensation_amount": 0,
                                    "base_original_price": 22,
                                    "base_price": 22,
                                    "base_price_incl_tax": 27.06,
                                    "base_row_invoiced": 0,
                                    "base_row_total": 22,
                                    "base_row_total_incl_tax": 27.06,
                                    "base_tax_amount": 4.3,
                                    "base_tax_invoiced": 0,
                                    "created_at": "2018-01-23 15:30:04",
                                    "discount_amount": 3.3,
                                    "discount_invoiced": 0,
                                    "discount_percent": 15,
                                    "free_shipping": 0,
                                    "discount_tax_compensation_amount": 0,
                                    "is_qty_decimal": 0,
                                    "is_virtual": 0,
                                    "item_id": 224,
                                    "name": "Radiant Tee-XS-Blue",
                                    "no_discount": 0,
                                    "order_id": 102,
                                    "original_price": 22,
                                    "price": 22,
                                    "price_incl_tax": 27.06,
                                    "product_id": 1546,
                                    "product_type": "simple",
                                    "qty_canceled": 0,
                                    "qty_invoiced": 0,
                                    "qty_ordered": 1,
                                    "qty_refunded": 0,
                                    "qty_shipped": 0,
                                    "quote_item_id": 675,
                                    "row_invoiced": 0,
                                    "row_total": 22,
                                    "row_total_incl_tax": 27.06,
                                    "row_weight": 1,
                                    "sku": "WS12-XS-Blue",
                                    "store_id": 1,
                                    "tax_amount": 4.3,
                                    "tax_invoiced": 0,
                                    "tax_percent": 23,
                                    "updated_at": "2018-01-23 15:30:04",
                                    "weight": 1
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        "search_criteria": {
            "filter_groups": [
                {
                    "filters": [
                        {
                            "field": "customer_email",
                            "value": "pkarwatka28@example.com",
                            "condition_type": "eq"
                        }
                    ]
                }
            ]
        },
        "total_count": 61
    }
}
```

### GET [/vsbridge/user/me](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L78)

Gets the User profile for currently authorized user. It's called after `POST /vsbridge/user/login` successful call.

#### GET PARAMS:

`token` - user token returned from `POST /vsbridge/user/login`

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":
        {
            "id":158,
            "group_id":1,
            "default_shipping":"67",
            "created_at":"2018-02-28 12:05:39",
            "updated_at":"2018-03-29 10:46:03",
            "created_in":"Default Store View",
            "email":"pkarwatka102@divante.pl",
            "firstname":"Piotr",
            "lastname":"Karwatka",
            "store_id":1,
            "website_id":1,
            "addresses":[
                    {
                        "id":67,
                        "customer_id":158,
                        "region":
                            {
                                "region_code":null,
                                "region":null,
                                "region_id":0
                            },
                        "region_id":0,
                        "country_id":"PL",
                        "street": ["Street name","13"],
                        "telephone":"",
                        "postcode":"41-157",
                        "city":"Wrocław",
                        "firstname":"John","lastname":"Murphy",
                        "default_shipping":true
                    }],
            "disable_auto_group_change":0
        }
}
```
#### RESPONSE CODES:

- `200` when success
- `500` in case of error



### POST [/vsbridge/user/me](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/user.js#L78)

Updates the user address and other data information.

#### GET PARAMS:

`token` - user token returned from `POST /vsbridge/user/login`

#### REQUEST BODY:

As the request You should post the address information You like to apply to the current user (identified by the token).

```json
{
  "customer": {
    "id": 222,
    "group_id": 1,
    "default_billing": "105",
    "default_shipping": "105",
    "created_at": "2018-03-16 19:01:18",
    "updated_at": "2018-04-03 12:59:13",
    "created_in": "Default Store View",
    "email": "pkarwatka30@divante.pl",
    "firstname": "Piotr",
    "lastname": "Karwatka",
    "store_id": 1,
    "website_id": 1,
    "addresses": [
      {
        "id": 109,
        "customer_id": 222,
        "region": {
          "region_code": null,
          "region": null,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "PL",
        "street": [
          "Dmowskiego",
          "17"
        ],
        "company": "Divante2",
        "telephone": "",
        "postcode": "50-203",
        "city": "Wrocław",
        "firstname": "Piotr",
        "lastname": "Karwatka2",
        "vat_id": "PL8951930748"
      }
    ],
    "disable_auto_group_change": 0
  }
}
```

#### RESPONSE BODY:

In the response You'll get the current, updated information about the user.

```json
{
  "code": 200,
  "result": {
    "id": 222,
    "group_id": 1,
    "created_at": "2018-03-16 19:01:18",
    "updated_at": "2018-04-04 02:59:52",
    "created_in": "Default Store View",
    "email": "pkarwatka30@divante.pl",
    "firstname": "Piotr",
    "lastname": "Karwatka",
    "store_id": 1,
    "website_id": 1,
    "addresses": [
      {
        "id": 109,
        "customer_id": 222,
        "region": {
          "region_code": null,
          "region": null,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "PL",
        "street": [
          "Dmowskiego",
          "17"
        ],
        "company": "Divante2",
        "telephone": "",
        "postcode": "50-203",
        "city": "Wrocław",
        "firstname": "Piotr",
        "lastname": "Karwatka2",
        "vat_id": "PL8951930748"
      }
    ],
    "disable_auto_group_change": 0
  }
}
```

#### RESPONSE CODES:

- `200` when success
- `500` in case of error


## Stock module

### GET [`/vsbridge/stock/check/:sku`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/stock.js#L20)

This method is used to check the stock item for specified product sku

#### RESPONSE BODY:

```json
{
  "code": 200,
  "result": {
    "item_id": 580,
    "product_id": 580,
    "stock_id": 1,
    "qty": 53,
    "is_in_stock": true,
    "is_qty_decimal": false,
    "show_default_notification_message": false,
    "use_config_min_qty": true,
    "min_qty": 0,
    "use_config_min_sale_qty": 1,
    "min_sale_qty": 1,
    "use_config_max_sale_qty": true,
    "max_sale_qty": 10000,
    "use_config_backorders": true,
    "backorders": 0,
    "use_config_notify_stock_qty": true,
    "notify_stock_qty": 1,
    "use_config_qty_increments": true,
    "qty_increments": 0,
    "use_config_enable_qty_inc": true,
    "enable_qty_increments": false,
    "use_config_manage_stock": true,
    "manage_stock": true,
    "low_stock_date": null,
    "is_decimal_divided": false,
    "stock_status_changed_auto": 0
  }
}
```

### GET [`/vsbridge/stock/list`](https://github.com/DivanteLtd/vue-storefront-api/blob/master/src/api/stock.js#L52)
This method is used to check multiple stock items for specified product skus. Requires `skus` param of comma-separated values to indicate which stock items to return.

#### RESPONSE BODY:

```json
{
  "code": 200,
  "result": [
      {
        "item_id": 580,
        "product_id": 580,
        "stock_id": 1,
        "qty": 53,
        "is_in_stock": true,
        "is_qty_decimal": false,
        "show_default_notification_message": false,
        "use_config_min_qty": true,
        "min_qty": 0,
        "use_config_min_sale_qty": 1,
        "min_sale_qty": 1,
        "use_config_max_sale_qty": true,
        "max_sale_qty": 10000,
        "use_config_backorders": true,
        "backorders": 0,
        "use_config_notify_stock_qty": true,
        "notify_stock_qty": 1,
        "use_config_qty_increments": true,
        "qty_increments": 0,
        "use_config_enable_qty_inc": true,
        "enable_qty_increments": false,
        "use_config_manage_stock": true,
        "manage_stock": true,
        "low_stock_date": null,
        "is_decimal_divided": false,
        "stock_status_changed_auto": 0
    }
  ]
  
}
```

## Order module

### POST ['/vsbridge/order/create`](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/order.js#L17)

Queue the order into the order queue which will be asynchronously submitted to the eCommerce backend.

#### REQUEST BODY:

The `user_id` field is a numeric user id as returned in `api/user/me`.
The `cart_id` is a guest or authorized users quote id (You can mix guest cart with authroized user as well)

```json
{
    "user_id": "",
    "cart_id": "d90e9869fbfe3357281a67e3717e3524",
    "products": [
        {
            "sku": "WT08-XS-Yellow",
            "qty": 1
        }
    ],
    "addressInformation": {
        "shippingAddress": {
            "region": "",
            "region_id": 0,
            "country_id": "PL",
            "street": [
                "Example",
                "12"
            ],
            "company": "NA",
            "telephone": "",
            "postcode": "50-201",
            "city": "Wroclaw",
            "firstname": "Piotr",
            "lastname": "Karwatka",
            "email": "pkarwatka30@divante.pl",
            "region_code": ""
        },
        "billingAddress": {
            "region": "",
            "region_id": 0,
            "country_id": "PL",
            "street": [
                "Example",
                "12"
            ],
            "company": "Company name",
            "telephone": "",
            "postcode": "50-201",
            "city": "Wroclaw",
            "firstname": "Piotr",
            "lastname": "Karwatka",
            "email": "pkarwatka30@divante.pl",
            "region_code": "",
            "vat_id": "PL88182881112"
        },
        "shipping_method_code": "flatrate",
        "shipping_carrier_code": "flatrate",
        "payment_method_code": "cashondelivery",
        "payment_method_additional": {}
    },
    "order_id": "1522811662622-d3736c94-49a5-cd34-724c-87a3a57c2750",
    "transmited": false,
    "created_at": "2018-04-04T03:14:22.622Z",
    "updated_at": "2018-04-04T03:14:22.622Z"
}
```

#### RESPONSE BODY:

```json
{
    "code":200,
    "result":"OK"
}
```

In case of the JSON validation error, the validation errors will be returned inside the `result` object.

## Catalog module

### [/vsbridge/catalog](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/catalog.js#L4)

Catalog endpoints are a proxy to Elastic Search 5.x and can be used to search the store catalog (synchronized with Magento2 or other platform).

#### GET PARAMETERS

`/vsbridge/catalog/:index-name/:entity-name/_search?size=:pageSize&from=:offset&sort=`

`index-name` is an Elastic Search index name - by default it's `vue_storefront_catalog` for most instalations
`entity-name` is an Elastic Search entity name - `product`, `attribute`, `taxrule`, `category` ...
`pageSize` numeric value of the number of records to be returned
`offset` numeric value of the first record to be returned

#### EXAMPLE CALL

```bash
curl 'https://your-domain.example.com/vsbridge/catalog/vue_storefront_catalog/attribute/_search?size=50&from=0&sort=' -H 'content-type: application/json' -H 'accept: */*' --data-binary '{"query":{"bool":{"filter":{"bool":{"should":[{"term":{"attribute_code":"color"}},{"term":{"attribute_code":"size"}},{"term":{"attribute_code":"price"}}]}}}}}'
```

#### REQUEST BODY

Request body is a Elastic Search query. [Please read more on Elastic querying DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/_introducing_the_query_language.html)

```json
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "should": [
            {
              "term": {
                "attribute_code": "color"
              }
            },
            {
              "term": {
                "attribute_code": "size"
              }
            },
            {
              "term": {
                "attribute_code": "price"
              }
            }
          ]
        }
      }
    }
  }
}
```

#### RESPONSE BODY:

Elastic Search data format. Please read more on [data formats used in Vue Storefront](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/ElasticSearch%20data%20formats.md)

```json
{
  "took": 0,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 4,
    "max_score": 0,
    "hits": [
      {
        "_index": "vue_storefront_catalog",
        "_type": "attribute",
        "_id": "157",
        "_score": 0,
        "_source": {
          "is_used_in_grid": false,
          "is_visible_in_grid": false,
          "is_filterable_in_grid": false,
          "position": 0,
          "is_comparable": "0",
          "is_visible_on_front": "0",
          "is_visible": true,
          "scope": "global",
          "attribute_id": 157,
          "attribute_code": "size",
          "frontend_input": "select",
          "options": [
            {
              "label": " ",
              "value": ""
            },
            {
              "label": "55 cm",
              "value": "91"
            },
            {
              "label": "XS",
              "value": "167"
            },
            {
              "label": "65 cm",
              "value": "92"
            },
            {
              "label": "S",
              "value": "168"
            },
            {
              "label": "75 cm",
              "value": "93"
            },
            {
              "label": "M",
              "value": "169"
            },
            {
              "label": "6 foot",
              "value": "94"
            },
            {
              "label": "L",
              "value": "170"
            },
            {
              "label": "8 foot",
              "value": "95"
            },
            {
              "label": "XL",
              "value": "171"
            },
            {
              "label": "10 foot",
              "value": "96"
            },
            {
              "label": "28",
              "value": "172"
            },
            {
              "label": "29",
              "value": "173"
            },
            {
              "label": "30",
              "value": "174"
            },
            {
              "label": "31",
              "value": "175"
            },
            {
              "label": "32",
              "value": "176"
            },
            {
              "label": "33",
              "value": "177"
            },
            {
              "label": "34",
              "value": "178"
            },
            {
              "label": "36",
              "value": "179"
            },
            {
              "label": "38",
              "value": "180"
            }
          ],
          "is_user_defined": true,
          "default_frontend_label": "Size",
          "frontend_labels": null,
          "is_unique": "0",
          "validation_rules": [],
          "id": 157,
          "tsk": 1507209128867,
          "sgn": "lHoCOBS4B8qUtgG_ne8N1XnfdTwcWgRyvwAeVPRdVUE"
        }
      },
      {
        "_index": "vue_storefront_catalog",
        "_type": "attribute",
        "_id": "142",
        "_score": 0,
        "_source": {
          "is_filterable": true,
          "is_used_in_grid": false,
          "is_visible_in_grid": false,
          "is_filterable_in_grid": false,
          "position": 0,
          "is_comparable": "0",
          "is_visible_on_front": "0",
          "is_visible": true,
          "scope": "global",
          "attribute_id": 142,
          "attribute_code": "size",
          "frontend_input": "select",
          "options": [
            {
              "label": " ",
              "value": ""
            },
            {
              "label": "55 cm",
              "value": "91"
            },
            {
              "label": "XS",
              "value": "167"
            },
            {
              "label": "65 cm",
              "value": "92"
            },
            {
              "label": "S",
              "value": "168"
            },
            {
              "label": "75 cm",
              "value": "93"
            },
            {
              "label": "M",
              "value": "169"
            },
            {
              "label": "6 foot",
              "value": "94"
            },
            {
              "label": "L",
              "value": "170"
            },
            {
              "label": "8 foot",
              "value": "95"
            },
            {
              "label": "XL",
              "value": "171"
            },
            {
              "label": "10 foot",
              "value": "96"
            },
            {
              "label": "28",
              "value": "172"
            },
            {
              "label": "29",
              "value": "173"
            },
            {
              "label": "30",
              "value": "174"
            },
            {
              "label": "31",
              "value": "175"
            },
            {
              "label": "32",
              "value": "176"
            },
            {
              "label": "33",
              "value": "177"
            },
            {
              "label": "34",
              "value": "178"
            },
            {
              "label": "36",
              "value": "179"
            },
            {
              "label": "38",
              "value": "180"
            }
          ],
          "is_user_defined": true,
          "default_frontend_label": "Size",
          "frontend_labels": null,
          "is_unique": "0",
          "validation_rules": [],
          "id": 142,
          "tsk": 1512134647691,
          "sgn": "vHkjS2mGumtgjjzlDrGJnF6i8EeUU2twc2zkZe69ABc"
        }
      },
      {
        "_index": "vue_storefront_catalog",
        "_type": "attribute",
        "_id": "93",
        "_score": 0,
        "_source": {
          "is_filterable": true,
          "is_used_in_grid": true,
          "is_visible_in_grid": false,
          "is_filterable_in_grid": true,
          "position": 0,
          "is_comparable": "0",
          "is_visible_on_front": "0",
          "is_visible": true,
          "scope": "global",
          "attribute_id": 93,
          "attribute_code": "color",
          "frontend_input": "select",
          "options": [
            {
              "label": " ",
              "value": ""
            },
            {
              "label": "Black",
              "value": "49"
            },
            {
              "label": "Blue",
              "value": "50"
            },
            {
              "label": "Brown",
              "value": "51"
            },
            {
              "label": "Gray",
              "value": "52"
            },
            {
              "label": "Green",
              "value": "53"
            },
            {
              "label": "Lavender",
              "value": "54"
            },
            {
              "label": "Multi",
              "value": "55"
            },
            {
              "label": "Orange",
              "value": "56"
            },
            {
              "label": "Purple",
              "value": "57"
            },
            {
              "label": "Red",
              "value": "58"
            },
            {
              "label": "White",
              "value": "59"
            },
            {
              "label": "Yellow",
              "value": "60"
            }
          ],
          "is_user_defined": true,
          "default_frontend_label": "Color",
          "frontend_labels": null,
          "is_unique": "0",
          "validation_rules": [],
          "id": 93,
          "tsk": 1512134647691,
          "sgn": "-FiYBhiIoVUHYxoL5kIEy3WP00emAeT-RtwqsmB69Lo"
        }
      },
      {
        "_index": "vue_storefront_catalog",
        "_type": "attribute",
        "_id": "77",
        "_score": 0,
        "_source": {
          "is_filterable": true,
          "is_used_in_grid": false,
          "is_visible_in_grid": false,
          "is_filterable_in_grid": false,
          "position": 0,
          "is_comparable": "0",
          "is_visible_on_front": "0",
          "is_visible": true,
          "scope": "global",
          "attribute_id": 77,
          "attribute_code": "price",
          "frontend_input": "price",
          "options": [],
          "is_user_defined": false,
          "default_frontend_label": "Price",
          "frontend_labels": null,
          "is_unique": "0",
          "validation_rules": [],
          "id": 77,
          "tsk": 1512134647691,
          "sgn": "qU1O7BGcjcqZA_5KgJIaw4-HSUHcMyqgTy9jXy0THoE"
        }
      }
    ]
  }
}
```

### [/vsbridge/product/list](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/product.js#L22) and [/vsbridge/product/render-list](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/product.js#L39)

Magento specific methods to return the product details for specifed SKUs.
Methods are mostly used for data synchronization with Magento two and for some specific cases when overriding the platform prices inside Vue Storefront.

#### GET PARAMS:
`skus` - comma separated list of skus to get

#### EXAMPLE CALL:

```bash
curl https://your-domain.example.com/vsbridge/product/list?skus=WP07
curl https://your-domain.example.com/vsbridge/product/render-list?skus=WP07
```

#### RESPONSE BODY:

For list:

```json
{
  "code": 200,
  "result": {
    "items": [
      {
        "id": 1866,
        "sku": "WP07",
        "name": "Aeon Capri",
        "price": 0,
        "status": 1,
        "visibility": 4,
        "type_id": "configurable",
        "created_at": "2017-11-06 12:17:26",
        "updated_at": "2017-11-06 12:17:26",
        "product_links": [],
        "tier_prices": [],
        "custom_attributes": [
          {
            "attribute_code": "description",
            "value": "<p>Reach for the stars and beyond in these Aeon Capri pant. With a soft, comfortable feel and moisture wicking fabric, these duo-tone leggings are easy to wear -- and wear attractively.</p>\n<p>&bull; Black capris with teal accents.<br />&bull; Thick, 3\" flattering waistband.<br />&bull; Media pocket on inner waistband.<br />&bull; Dry wick finish for ultimate comfort and dryness.</p>"
          },
          {
            "attribute_code": "image",
            "value": "/w/p/wp07-black_main.jpg"
          },
          {
            "attribute_code": "category_ids",
            "value": [
              "27",
              "32",
              "35",
              "2"
            ]
          },
          {
            "attribute_code": "url_key",
            "value": "aeon-capri"
          },
          {
            "attribute_code": "tax_class_id",
            "value": "2"
          },
          {
            "attribute_code": "eco_collection",
            "value": "0"
          },
          {
            "attribute_code": "performance_fabric",
            "value": "1"
          },
          {
            "attribute_code": "erin_recommends",
            "value": "0"
          },
          {
            "attribute_code": "new",
            "value": "0"
          },
          {
            "attribute_code": "sale",
            "value": "0"
          },
          {
            "attribute_code": "style_bottom",
            "value": "107"
          },
          {
            "attribute_code": "pattern",
            "value": "195"
          },
          {
            "attribute_code": "climate",
            "value": "205,212,206"
          }
        ]
      }
    ],
    "search_criteria": {
      "filter_groups": [
        {
          "filters": [
            {
              "field": "sku",
              "value": "WP07",
              "condition_type": "in"
            }
          ]
        }
      ]
    },
    "total_count": 1
  }
}
```

For render-list:

```json
{
  "code": 200,
  "result": {
    "items": [
      {
        "price_info": {
          "final_price": 59.04,
          "max_price": 59.04,
          "max_regular_price": 59.04,
          "minimal_regular_price": 59.04,
          "special_price": null,
          "minimal_price": 59.04,
          "regular_price": 48,
          "formatted_prices": {
            "final_price": "<span class=\"price\">$59.04</span>",
            "max_price": "<span class=\"price\">$59.04</span>",
            "minimal_price": "<span class=\"price\">$59.04</span>",
            "max_regular_price": "<span class=\"price\">$59.04</span>",
            "minimal_regular_price": null,
            "special_price": null,
            "regular_price": "<span class=\"price\">$48.00</span>"
          },
          "extension_attributes": {           
            "tax_adjustments": {
              "final_price": 47.999999,
              "max_price": 47.999999,
              "max_regular_price": 47.999999,
              "minimal_regular_price": 47.999999,
              "special_price": 47.999999,
              "minimal_price": 47.999999,
              "regular_price": 48,
              "formatted_prices": {
                "final_price": "<span class=\"price\">$48.00</span>",
                "max_price": "<span class=\"price\">$48.00</span>",
                "minimal_price": "<span class=\"price\">$48.00</span>",
                "max_regular_price": "<span class=\"price\">$48.00</span>",
                "minimal_regular_price": null,
                "special_price": "<span class=\"price\">$48.00</span>",
                "regular_price": "<span class=\"price\">$48.00</span>"
              }
            },
            "weee_attributes": [],
            "weee_adjustment": "<span class=\"price\">$59.04</span>"
          }
        },
        "url": "http://demo-magento2.vuestorefront.io/aeon-capri.html",
        "id": 1866,
        "name": "Aeon Capri",
        "type": "configurable",
        "store_id": 1,
        "currency_code": "USD",
        "sgn": "bCt7e44sl1iZV8hzYGioKvSq0EdsAcF21FhpTG5t8l8"
      }
    ]
  }
}
```


## Image module

### [/img](https://github.com/DivanteLtd/vue-storefront-api/blob/7d98771994b1009ad17d69c458f9e93686cfb145/src/vsbridge/img.js#L5)

This simple API module is used to just resize the images using [Imageable](https://github.com/sdepold/node-imageable) node library.

#### GET PARAMS

`/img/{width}/{height}/{operation}/{relativeUrl}`

for example:

`https://your-domain.example.com/img/310/300/resize/w/p/wp07-black_main.jpg`

`width` - numeric value of the picure width - to be "resized", "cropped" ... regarding the `operation` parameter
`height` - numeric value of the picure height - to be "resized", "cropped" ... regarding the `operation` parameter
`operation` - one of the operations supported by [Imageable](https://github.com/sdepold/node-imageable): crop, fit, resize, identify (to get the picture EXIF data)
`relatveUrl` is the relative to 

Other examples:

- https://your-domain.example.com/img/310/300/identify/w/p/wp07-black_main.jpg - to get the JSON encoded EXIF information
- https://your-domain.example.com/img/310/300/crop/w/p/wp07-black_main.jpg?crop=500x500%2B200%2B400 - to crop image (the crop parameter format = '{width}x{height}+{left}+{top}')
