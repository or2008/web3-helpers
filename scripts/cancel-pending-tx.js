const actions = require('../actions');

const txHash = '0x31299e887af6dc4baa59c41269d76e370a15cd199e984764436f9eb58b17f74a';
const privateKey = '0x';
const gasPriceWei = 15000000000;

actions.transaction.cancelPendingTx(txHash, privateKey, gasPriceWei);
