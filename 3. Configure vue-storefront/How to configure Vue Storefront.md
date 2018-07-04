## How to configure Vue Storefront

**Layer A** integration is very simple.

By default Vue Storefront uses ES index named `vue_storefront_catalog`. Please apply the changes accordingly to:
- `vue-storefront` [config file](https://github.com/DivanteLtd/vue-storefront/tree/master/config) `local.json` to point to right index name,
- `vue-storefront-api` [config file](https://github.com/DivanteLtd/vue-storefront-api/tree/master/config) `local.json` to point to right index name.

Restart `vue-storefront` and `vue-storefront-api`.

**Please note**: You'll be still using `vue-storefront-api` for the ElasticSearch support.

**Layer B** integration requires You to change the `config/local.json` to set the proper endpoints.

The `cart` section: 
- `create_endpoint` - Should point to: [cart/create](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartcreate)
- `updateitem_endpoint` - Should point to: [cart/update](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartupdate)
- `deleteitem_endpoint` - Should point to: [cart/delete](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartdelete)
- `pull_endpoint` - Should point to: [cart/pull](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#get-vsbridgecartpull)
- `totals_endpoint` - Should point to: [cart/totals](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#get-vsbridgecarttotals)
- `paymentmethods_endpoint` - Should point to: [cart/payment-methods](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#get-vsbridgecartpayment-methods)
- `shippingmethods_endpoint` - Should point to: [cart/shipping-methods](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartshipping-methods) 
- `shippinginfo_endpoint` - Should point to: [cart/shipping-information](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartshipping-information)
- `collecttotals_endpoint` - Should point to: [cart/collect-totals](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartcollect-totals)
- `deletecoupon_endpoint` - Should point to: [cart/delete-coupon](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartdelete-coupon)
- `applycoupon_endpoint` - Should point to: [cart/apply-coupon](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgecartapply-coupon)

The `users` section:
- `history_endpoint` - Should point to: [user/order-history](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#get-vsbridgeuserorder-history)
- `resetPassword_endpoint` - Should point to: [user/resetPassword](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeuserresetpassword)
- `changePassword_endpoint` - Should point to: [user/changePassword](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeuserchangepassword)
- `login_endpoint` - Should point to: [user/login](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeuserlogin)
- `create_endpoint` - Should point to: [user/create](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeusercreate)
- `me_endpoint` - Should point to: [user/me](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#get-vsbridgeuserme)
- `refresh_endpoint` - Should point to: [user/refresh](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeuserrefresh)

The `stock` section:
- `endpoint` - Should point to: [stock/check](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#get-vsbridgestockchecksku)

The `orders` section:
- `endpoint` - Should point to: [order/create](https://github.com/DivanteLtd/vue-storefront-integration-boilerplate/blob/master/1.%20Expose%20the%20API%20endpoints%20required%20by%20VS/Required%20API%20specification.md#post-vsbridgeordercreate)