# API docs for Vue Storefront

To integrate the [vue-storefront](https://github.com/DivanteLtd/vue-storefront) with third party platform You should start with building the API around the platform. It should be compatible with the following specification to let Vue Storefront app seamlesly use it and process the data.

The example implementation references/links are provided for the Magento1 module.

**This is general purpose API** for 3rd party platform integration with Vue Storefront.

Here you can find some example implementations of this API:
- [`vue-storefront-api`](https://github.com/DivanteLtd/vue-storefront-api/) - NodeJS, this is our default API integrated with magento2
- [`magento1-vsbridge`](https://github.com/DivanteLtd/magento1-vsbridge/tree/master/magento1-module/app/code/local/Divante/VueStorefrontBridge/controllers) - API implementation done as a native Magento1 module
- [`coreshop-bridge`](https://github.com/DivanteLtd/coreshop-vsbridge/tree/master/src/CoreShop2VueStorefrontBundle/Controller) - Symfony based implementation for Coreshop,
- [`spree2vuestorefront](https://github.com/spark-solutions/spree2vuestorefront) - Ruby implementation for the Spree Commerce platform.

## Dynamic requests API specification 

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
            "base_currency_code":"USD",
            "quote_currency_code":"USD",
            "items_qty":1,
            "items":
                [
                    {
                        "item_id":5853,
                        "price":0,
                        "qty":1,
                        "row_total":0,
                        "row_total_with_discount":0,
                        "tax_amount":0,
                        "tax_percent":0,
                        "discount_amount":0,
                        "base_discount_amount":0,
                        "discount_percent":0,
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

This method sets the shipping information on specified quote which is a required step before calling `api/cart/totals`

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
      "subtotal": 48,
      "discount_amount": -8.86,
      "subtotal_with_discount": 39.14,
      "shipping_amount": 5,
      "shipping_discount_amount": 0,
      "tax_amount": 9.38,
      "shipping_tax_amount": 0,
      "base_shipping_tax_amount": 0,
      "subtotal_incl_tax": 59.04,
      "shipping_incl_tax": 5,
      "base_currency_code": "USD",
      "quote_currency_code": "USD",
      "items_qty": 2,
      "items": [
        {
          "item_id": 5853,
          "price": 24,
          "qty": 2,
          "row_total": 48,
          "row_total_with_discount": 0,
          "tax_amount": 9.38,
          "tax_percent": 23,
          "discount_amount": 8.86,
          "discount_percent": 15,
          "price_incl_tax": 29.52,
          "row_total_incl_tax": 59.04,
          "base_row_total_incl_tax": 59.04,
          "options": "[]",
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

**Note:** these two methods are optional and are being used ONLY when the [`config.products.alwaysSyncPlatformPricesOver` option is set on](https://docs.vuestorefront.io/guide/basics/configuration.html#products).

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
