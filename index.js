const actions = require('./actions');
const helpers = require('./helpers');
const utils = require('./utils');
const services = require('./services');

function init(web3ProviderPath = 'ws://127.0.0.1:8546') {
    return services.web3.init(web3ProviderPath);
}

module.exports = {
    init,
    utils,
    helpers,
    actions
};
