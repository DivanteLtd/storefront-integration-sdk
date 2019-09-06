'use strict'
const unirest = require('unirest')

class VsBridgeApiClient {

    /**
     * Setup Pimcore Api Client
     * @param {object} config configuration with "apiKey" and "url" keys for Pimcore API endpoint
     */
    constructor(config) {
        this.config = config

        if (!config.vsbridge.url)
            throw Error('url is required config keys for Pimcore Api Client')
    
        this.baseUrl = `${config.url}vsbrdige/`
        this.apiKey = '' // will be set after the authorization
        this.client = unirest
    }

    authWith(apiKey) {
        this.apiKey = apiKey
    }
    _setupRequest(unirest) {
        return unirest.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})        
    }
    _setupUrl(endpointUrl) {
        const url = endpointUrl + '?apikey=' + encodeURIComponent(this.apiKey)
        console.log('Fetching data from', url);
        return url
    }
    post(endpointName) {
        return this._setupRequest(this.client.post(this._setupUrl(endpointName)))
    }

    get(endpointName) {
        return this._setupRequest(this.client.get(this._setupUrl(endpointName)))
    }

    put(endpointName) {
        return this._setupRequest(client.put(this._setupUrl(endpointName)))
    }

    delete(endpointName) {
        return this._setupRequest(client.delete(this._setupUrl(endpointName)))
    }
    
}
module.exports = VsBridgeApiClient