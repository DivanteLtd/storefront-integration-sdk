import { apiStatus, apiError } from '../lib/util';
import { Router } from 'express';

export default ({ config, db }) => {

	let cartApi = Router();

	/** 
	 * POST create a cart
	 * req.query.token - user token
	 * 
	 * For authorized user: 
	 * 
	 * ```bash
	 * curl 'http://localhost:8080/api/cart/create?token=xu8h02nd66yq0gaayj4x3kpqwity02or' -X POST
	 * ```
	 * 
	 * For anonymous user:
	 * 
	 * ```bash
	 * curl 'https://localhost:8080/api/cart/create' -X POST
	 * ```
	 * 
	 * Details: https://github.com/DivanteLtd/vue-storefront-integration-sdk/blob/tutorial/Dynamic%20API%20specification.md#post-vsbridgecartcreate
	 * 
	 */
	cartApi.post('/create', (req, res) => {
		res.json({
			"code": 200,
			"result": "a17b9b5fb9f56652b8280bb94c52cd93"
		})
	})

	/** 
	 * POST update or add the cart item
	 *
	 * Request boddy:
	 * {  
	 *	"cartItem":{  
	 *		"sku":"WS12-XS-Orange",
	 *		"qty":1,
	 *		"product_option":{  
	 *			"extension_attributes":{  
	 *				"custom_options":[  
 	 *
 	 *					],
	 *				"configurable_item_options":[  
	 *				{  
	 *					"option_id":"93",
	 *					"option_value":"56"
	 *				},
	 *				{  
	 *					"option_id":"142",
	 *					"option_value":"167"
	 *				}
	 *				],
	 *				"bundle_options":[  
 	 *
 	 *					]
	 *			}
	 *		},
	 *		"quoteId":"0a8109552020cc80c99c54ad13ef5d5a"
	 *	}
	 *}
	 * Details: https://github.com/DivanteLtd/vue-storefront-integration-sdk/blob/tutorial/Dynamic%20API%20specification.md#post-vsbridgecartupdate
	 */
	cartApi.post('/update', (req, res) => {
		res.json({
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
		})
	})

	/** 
	 * POST apply the coupon code
	 *   req.query.token - user token
	 *   req.query.cartId - cart Ids
	 *   req.query.coupon - coupon
	 * 
	 * ```bash
	 * curl 'http://localhost:8080/api/cart/apply-coupon?token=2q1w9oixh3bukxyj947tiordnehai4td&cartId=5effb906a97ebecd6ae96e3958d04edc&coupon=ARMANi' -X POST -H 'content-type: application/json'
	 * ```
	 * 
	 * Details: https://github.com/DivanteLtd/vue-storefront-integration-sdk/blob/tutorial/Dynamic%20API%20specification.md#post-vsbridgecartapply-coupon
	 */
	cartApi.post('/apply-coupon', (req, res) => {
		res.json({
			"code":200,
			"result":true
		})
	})

	/** 
	 * POST remove the coupon code
	 *   req.query.token - user token
	 *   req.query.cartId - cart Ids
	 *
	 * ```bash
	 * curl 'https://your-domain.example.com/vsbridge/cart/delete-coupon?token=2q1w9oixh3bukxyj947tiordnehai4td&cartId=5effb906a97ebecd6ae96e3958d04edc' -X POST -H 'content-type: application/json'
	 * ```
	 * 
	 * Details:
	 */
	cartApi.post('/delete-coupon', (req, res) => {
		res.json({
			"code":200,
			"result":true
		})		
	})

	/** 
	 * GET get the applied coupon code
	 *   req.query.token - user token
	 *   req.query.cartId - cart Ids
	 * 
	 * ```bash
	 * curl 'http://loccalhost:8080/api/cart/coupon?token=2q1w9oixh3bukxyj947tiordnehai4td&cartId=5effb906a97ebecd6ae96e3958d04edc' -H 'content-type: application/json'
	 * ```
	 */
	cartApi.get('/coupon', (req, res) => {
		res.json({
			"code":200,
			"result":"ARMANI"
		})
	})

	/** 
	 * POST delete the cart item
	 *   req.query.token - user token
	 * 
	 * Request body;
	 * {
	 * 		"cartItem":
	 * 		{
	 * 			"sku":"MS10-XS-Black",
	 * 			"item_id":5853,
	 * 			"quoteId":"81668"
	 * 		}
	 * }
	 *  
	 * Details: https://github.com/DivanteLtd/vue-storefront-integration-sdk/blob/tutorial/Dynamic%20API%20specification.md#post-vsbridgecartdelete
	 */
	cartApi.post('/delete', (req, res) => {
		res.json({
			"code":200,
			"result":true
		})
	})

	/** 
	 * GET pull the whole cart as it's currently se server side
	 *   req.query.token - user token
	 *   req.query.cartId - cartId
	 * 
	 * For authorized users;
	 * 
	 * ```bash
	 * curl http://localhost:8080/api/cart/pull?token=xu8h02nd66yq0gaqwity02or
	 * ```
	 * 
	 * Details:
	 * https://github.com/DivanteLtd/vue-storefront-integration-sdk/blob/tutorial/Dynamic%20API%20specification.md#get-vsbridgecartpull
	 */
	cartApi.get('/pull', (req, res) => {
		res.json({
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
		  })
	})

	/** 
	 * GET totals the cart totals
	 *   req.query.token - user token
	 *   req.query.cartId - cartId
	 */
	cartApi.get('/totals', (req, res) => {
	})

	/**
	 * POST /shipping-methods - available shipping methods for a given address
	 *   req.query.token - user token
	 *   req.query.cartId - cart ID if user is logged in, cart token if not
	 *   req.body.address - shipping address object
	 */
	cartApi.post('/shipping-methods', (req, res) => {
	})

	/**
	 * GET /payment-methods - available payment methods
	 *   req.query.token - user token
	 *   req.query.cartId - cart ID if user is logged in, cart token if not
	 */
	cartApi.get('/payment-methods', (req, res) => {
	})

	/**
	 * POST /shipping-information - set shipping information for collecting cart totals after address changed
	 *   req.query.token - user token
	 *   req.query.cartId - cart ID if user is logged in, cart token if not
	 *   req.body.addressInformation - shipping address object
	 */
	cartApi.post('/shipping-information', (req, res) => {
	})

	return cartApi
}
