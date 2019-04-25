const Web3 = require('web3');

let web3;
async function init(providerPath) {
    const eventProvider = new Web3.providers.WebsocketProvider(providerPath);
    web3 = new Web3(eventProvider);

    return new Promise((resolve, reject) => {
        eventProvider.on('connect', () => resolve());
        eventProvider.on('error', e => reject(e));
        eventProvider.on('end', e => reject(e));
    });
}

function getInstance() {
    return web3;
}

module.exports = {
    init,
    getInstance
};
