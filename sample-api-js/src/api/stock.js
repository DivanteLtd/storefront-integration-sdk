import { apiStatus, apiError } from '../lib/util';import { Router } from 'express';
import PlatformFactory from '../platform/factory'

export default ({ config, db }) => {

	let api = Router();

	/**
	 * GET get stock item
	 */
	api.get('/check/:sku', (req, res) => {
	})

	/**
	 * GET get stock item - 2nd version with the query url parameter
	 */
	api.get('/check', (req, res) => {
	})

	/**
	 * GET get stock item list by skus (comma separated)
	 */
	api.get('/list', (req, res) => {
	})

	return api
}
