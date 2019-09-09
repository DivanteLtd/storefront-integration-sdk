import resource from 'resource-router-middleware';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'order',

	/**
	 * POST create an order with JSON payload compliant with models/order.md
	 */
	create(req, res) {
	},
});
