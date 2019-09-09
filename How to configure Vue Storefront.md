## How to configure Vue Storefront

**Layer A** integration is very simple.

By default Vue Storefront uses ES index named `vue_storefront_catalog`. Please apply the changes accordingly to:
- `vue-storefront` [config file](https://github.com/DivanteLtd/vue-storefront/tree/master/config) `local.json` to point to right index name,
- `vue-storefront-api` [config file](https://github.com/DivanteLtd/vue-storefront-api/tree/master/config) `local.json` to point to right index name.

Restart `vue-storefront` and `vue-storefront-api`.
 
**Please note**: By default `vue-storefront` is using `vue-storefront-api` as a proxy to ElasticSearch. You might want to use the Elastic connection directly. In that case feel free to put the `http://localhost:9200` or whatever Elastic URL you have as a `elasticsearch.host` to `vue-storefront/config/local.json`.

The integration requires You to change the `config/local.json` to set the proper endpoints for [Dynamic API calls](Dynamic%20API%20specification.md).

The `cart` section: 
- `create_endpoint` - Should point to: [cart/create](Dynamic%20API%20specification.md#post-vsbridgecartcreate)
- `updateitem_endpoint` - Should point to: [cart/update](Dynamic%20API%20specification.md#post-vsbridgecartupdate)
- `deleteitem_endpoint` - Should point to: [cart/delete](Dynamic%20API%20specification.md#post-vsbridgecartdelete)
- `pull_endpoint` - Should point to: [cart/pull](Dynamic%20API%20specification.md#get-vsbridgecartpull)
- `totals_endpoint` - Should point to: [cart/totals](Dynamic%20API%20specification.md#get-vsbridgecarttotals)
- `paymentmethods_endpoint` - Should point to: [cart/payment-methods](Dynamic%20API%20specification.md#get-vsbridgecartpayment-methods)
- `shippingmethods_endpoint` - Should point to: [cart/shipping-methods](Dynamic%20API%20specification.md#post-vsbridgecartshipping-methods) 
- `shippinginfo_endpoint` - Should point to: [cart/shipping-information](Dynamic%20API%20specification.md#post-vsbridgecartshipping-information)
- `collecttotals_endpoint` - Should point to: [cart/collect-totals](Dynamic%20API%20specification.md#post-vsbridgecartcollect-totals)
- `deletecoupon_endpoint` - Should point to: [cart/delete-coupon](Dynamic%20API%20specification.md#post-vsbridgecartdelete-coupon)
- `applycoupon_endpoint` - Should point to: [cart/apply-coupon](Dynamic%20API%20specification.md#post-vsbridgecartapply-coupon)

The `users` section:
- `history_endpoint` - Should point to: [user/order-history](Dynamic%20API%20specification.md#get-vsbridgeuserorder-history)
- `resetPassword_endpoint` - Should point to: [user/resetPassword](Dynamic%20API%20specification.md#post-vsbridgeuserresetpassword)
- `changePassword_endpoint` - Should point to: [user/changePassword](Dynamic%20API%20specification.md#post-vsbridgeuserchangepassword)
- `login_endpoint` - Should point to: [user/login](Dynamic%20API%20specification.md#post-vsbridgeuserlogin)
- `create_endpoint` - Should point to: [user/create](Dynamic%20API%20specification.md#post-vsbridgeusercreate)
- `me_endpoint` - Should point to: [user/me](Dynamic%20API%20specification.md#get-vsbridgeuserme)
- `refresh_endpoint` - Should point to: [user/refresh](Dynamic%20API%20specification.md#post-vsbridgeuserrefresh)

The `stock` section:
- `endpoint` - Should point to: [stock/check](Dynamic%20API%20specification.md#get-vsbridgestockchecksku)

The `orders` section:
- `endpoint` - Should point to: [order/create](Dynamic%20API%20specification.md#post-vsbridgeordercreate)