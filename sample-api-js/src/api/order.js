import resource from 'resource-router-middleware';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'order',

	/**
	 * POST create an order
	 * 
	 * Request body:
	 * 
	 * {
     *   "user_id": "",
     *   "cart_id": "d90e9869fbfe3357281a67e3717e3524",
     *   "products": [
     *      {
     *           "sku": "WT08-XS-Yellow",
     *          "qty": 1
     *       }
     *   ],
     *   "addressInformation": {
     *       "shippingAddress": {
     *           "region": "",
     *           "region_id": 0,
     *           "country_id": "PL",
     *           "street": [
     *               "Example",
     *               "12"
     *           ],
     *           "company": "NA",
     *           "telephone": "",
     *           "postcode": "50-201",
     *           "city": "Wroclaw",
     *           "firstname": "Piotr",
     *           "lastname": "Karwatka",
     *           "email": "pkarwatka30@divante.pl",
     *           "region_code": ""
     *       },
     *       "billingAddress": {
     *           "region": "",
     *           "region_id": 0,
     *           "country_id": "PL",
     *           "street": [
     *                "Example",
     *               "12"
     *           ],
     *           "company": "Company name",
     *           "telephone": "",
     *           "postcode": "50-201",
     *           "city": "Wroclaw",
     *           "firstname": "Piotr",
     *           "lastname": "Karwatka",
     *           "email": "pkarwatka30@divante.pl",
     *           "region_code": "",
     *           "vat_id": "PL88182881112"
     *       },
     *       "shipping_method_code": "flatrate",
     *       "shipping_carrier_code": "flatrate",
     *       "payment_method_code": "cashondelivery",
     *       "payment_method_additional": {}
     *   },
     *   "order_id": "1522811662622-d3736c94-49a5-cd34-724c-87a3a57c2750",
     *   "transmited": false,
     *   "created_at": "2018-04-04T03:14:22.622Z",
     *   "updated_at": "2018-04-04T03:14:22.622Z"
	 *  }
	 */
	create(req, res) {
		res.json({
			"code":200,
			"result":"OK"
		})
	},
});
