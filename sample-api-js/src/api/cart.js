import { apiStatus, apiError } from '../lib/util';
import { Router } from 'express';

export default ({ config, db }) => {

	let cartApi = Router();

	/** 
	 * POST create a cart
	 * req.query.token - user token
	 */
	cartApi.post('/create', (req, res) => {
	})

	/** 
	 * POST update or add the cart item
	 *   req.query.token - user token
	 *   body.cartItem: {
	 *	  sku: orderItem.sku, 
	 *	  qty: orderItem.qty, 
	 *	 quoteId: cartKey}
	 */
	cartApi.post('/update', (req, res) => {
	})

	/** 
	 * POST apply the coupon code
	 *   req.query.token - user token
	 *   req.query.cartId - cart Ids
	 *   req.query.coupon - coupon
	 */
	cartApi.post('/apply-coupon', (req, res) => {
	})

	/** 
	 * POST remove the coupon code
	 *   req.query.token - user token
	 *   req.query.cartId - cart Ids
	 */
	cartApi.post('/delete-coupon', (req, res) => {
	})

	/** 
	 * GET get the applied coupon code
	 *   req.query.token - user token
	 *   req.query.cartId - cart Ids
	 */
	cartApi.get('/coupon', (req, res) => {
	})

	/** 
	 * POST delete the cart item
	 *   req.query.token - user token
	 *   body.cartItem: {
	 *	  sku: orderItem.sku, 
	 *	  qty: orderItem.qty, 
	 *	 quoteId: cartKey}
	 */
	cartApi.post('/delete', (req, res) => {
	})

	/** 
	 * GET pull the whole cart as it's currently se server side
	 *   req.query.token - user token
	 *   req.query.cartId - cartId
	 */
	cartApi.get('/pull', (req, res) => {
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
