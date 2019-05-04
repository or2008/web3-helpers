const actions = require('./actions');
const helpers = require('./helpers');
const utils = require('./utils');
const services = require('./services');

class Web3Helpers {
    constructor(web3ProviderPath = 'ws://127.0.0.1:8546') {
        services.web3.init(web3ProviderPath);

        this.helpers = helpers;
        this.utils = utils;
        this.actions = actions;
    }

    getWeb3Instance() {
        return services.web3.getInstance();
    }
}

module.exports = Web3Helpers;
