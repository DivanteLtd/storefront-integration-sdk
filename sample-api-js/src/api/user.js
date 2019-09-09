import { apiStatus, encryptToken, decryptToken, apiError } from '../lib/util';
import { Router } from 'express';
import PlatformFactory from '../platform/factory';
import jwt from 'jwt-simple';
import { merge } from 'lodash';

export default ({config, db}) => {

	let userApi = Router();
	/**
	 * POST create an user
	 */
	userApi.post('/create', (req, res) => {
	})

	/**
	 * POST login an user
	 */
	userApi.post('/login', (req, res) => {
	});

	/**
	 * POST refresh user token
	 */
	userApi.post('/refresh', (req, res) => {
	});

	/**
	 * POST resetPassword
	 */
	userApi.post('/reset-password', (req, res) => {
	});

  /**
	 * GET  an user
	 */
	userApi.get('/me', (req, res) => {
	});

	/**
	 * GET  an user order history
	 */
	userApi.get('/order-history', (req, res) => {
	});

	/**
	 * POST for updating user
	 */
	userApi.post('/me', (req, res) => {
	})

	/**
	 * POST for changing user's password
	 */
	userApi.post('/change-password', (req, res) => {
	});

	return userApi
}
