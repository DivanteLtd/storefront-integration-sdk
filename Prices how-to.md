# Prices how-to

Vue Storefront has two modes of calculating the product prices:
- Client side (when `config.tax.calculateServerSide` is set to `false`) - that can be usefull in case the tax should be recalculated based on the address change,
- Server side (when `config.tax.calculateServerSide` is set to `true`) - which is our default mode.

Depending on the mode, taxes are calulated by [`taxCalc.ts` client side](https://github.com/DivanteLtd/vue-storefront/blob/5f2b5cd6a8496a60884c091e8509d3b58b7a0358/core/modules/catalog/helpers/taxCalc.ts#L74) or [`taxcalc.js` server side](https://github.com/DivanteLtd/vue-storefront-api/blob/d3d0e7892cd063bbd69e545f3f2b6fdd9843d524/src/lib/taxcalc.js#L251-L253). 

You may see that both these files are applying **exactly** the same logic.

In order to calculate the prices and taxes we need first toget the proper tax rate. It's based on [`taxrate`](https://github.com/DivanteLtd/vue-storefront-integration-sdk#taxrate-entity) entity, stored in the Elastic. Each product can have the property [`product.tax_class_id`](https://github.com/DivanteLtd/vue-storefront/blob/5f2b5cd6a8496a60884c091e8509d3b58b7a0358/core/modules/catalog/helpers/taxCalc.ts#L213) set. Depending on it's value Vue Storefront is applying the `taxrate`, it's also applying the [country and region to the filter](https://github.com/DivanteLtd/vue-storefront/blob/5f2b5cd6a8496a60884c091e8509d3b58b7a0358/core/modules/catalog/helpers/taxCalc.ts#L226). 

**Note:** We're currently not supporting searching the tax rules by `customer_tax_class_id` neither by the `tax_postcode` fields of `taxrate` entity. Pull requests more than welcome ;)

After getting the right tax rate we can calculate the prices.

We've got the following price fields priority in the VS:
- `final_price` - if set, depending on the `config.tax.finalPriceIncludesTax` - it's taken as final price or Net final price,
- `special_price` - if it's set and it's lower than `price` it will replace the `price` and the `price` value will be set into `original_price` property,
- `price` - if set, dedending on the `config.tax.sourcePriceIncludesTax` - it's taken as final price or Net final price.

Depending on the `config.tax.finalPriceIncludesTax` and `config.tax.sourcePriceIncludesTax` settings Vue Storefront calculates the prices and stores them into following fields.

Product Special price:
- `special_price` - optional, if set - it's always Net price,
- `special_price_incl_tax` - optional, if set - it's always price after taxes,
- `special_price_tax` - optional, if set it's the tax amount.

Product Regular price:
- `price` - required, if set - it's always Net price,
- `price_incl_tax` - required, if set - it's always price after taxes,
- `price_tax` - required, if set it's the tax amount,

Product Final price:
- `final_price` - optional, if set - it's always Net price,
- `final_price_incl_tax` - optional, if set - it's always price after taxes,
- `final_price_tax` - optional, if set it's the tax amount,

Product Original price (set only if `final_price` or `special_price` are lower than `price`):
- `original_price` - optional, if set - it's always Net price,
- `original_price_incl_tax` - optional, if set - it's always price after taxes,
- `original_price_tax` - optional, if set it's the tax amount.

**Note:** The prices are being set for all `configurable_children` with the exact same format
**Note:** If any of the `configurable_children` has the price lower than the main product, the main product price will be updated accordingly.

#### Cart prices
Additionally to product prices, the cart item prices in cart/totals endpoint contains following price keys which are always Net prices:
- `price`
- `base_price`
- `row_total`
- `base_row_total`
each of them also have their gross price equivalent suffixed by `_incl_tax`

The cart/totals has a key "total_segments" in which there are two segments: `subtotal` and `grand_total`. The amounts returned there behave differently for each store depending on the backend setting. 
For Magento backend, this is described here: https://docs.magento.com/m2/ce/user_guide/configuration/sales/tax.html#shopping-cart-display-settings
So make sure to adjust it in your custom integration according to your business logic.
