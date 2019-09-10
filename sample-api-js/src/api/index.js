import { version } from '../../package.json';
import { Router } from 'express';
import order from './order';
import user from './user';
import stock from './stock';
import cart from './cart';
import catalog from './catalog';

export default ({ config, db }) => {
	let api = Router();

  // mount the catalog resource
  api.use('/catalog', catalog({ config, db }))	

	// mount the order resource
	api.use('/order', order({ config, db }));

	// mount the user resource
	api.use('/user', user({ config, db }));

	// mount the stock resource
	api.use('/stock', stock({ config, db }));

	// mount the cart resource
	api.use('/cart', cart({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
