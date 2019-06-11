const services = require('../services');
const erc20Abi = require('../erc20-abi.json');
const helpers = require('../helpers');

async function loadBalance(currencyCode, address) {
    if (currencyCode == 'ETH') return this.loadEthBalance(address);

    const contractAddress = helpers.currency.getTokenContractAddress(currencyCode);
    return this.loadTokenBalance(address, contractAddress);
}

async function loadEthBalance(address) {
    const web3 = services.web3.getInstance();
    const balance = web3.eth.getBalance(address);
    return balance;
}

async function loadTransactionCount(address, qualifier) {
    const web3 = services.web3.getInstance();
    const txCount = web3.eth.getTransactionCount(address, qualifier);
    return txCount;
}

async function loadCurrentBlockNumber() {
    const web3 = services.web3.getInstance();
    const currentBlockNumber = await web3.eth.getBlockNumber();
    return currentBlockNumber;
}

async function loadCurrentBlock() {
    const web3 = services.web3.getInstance();
    const currentBlockNumber = await loadCurrentBlockNumber();
    const currentBlock = await web3.eth.getBlock(currentBlockNumber);
    return currentBlock;
}

async function loadCurrentBlockTime() {
    const currentBlock = await loadCurrentBlock();
    return currentBlock.timestamp;
}

async function loadTokenBalance(address, contractAddress) {
    const data = await this.callContractMethod(erc20Abi, contractAddress, 'balanceOf', address);
    return data;
}

async function callContractMethod(abi, contractAddress, methodName, ...args) {
    const web3 = services.web3.getInstance();
    const contract = new web3.eth.Contract(abi, contractAddress);
    const data = await contract.methods[methodName](...args).call();
    return data.gte ? data.toString() : data; // TODO - use: web3.utils.isBN
}

function subscribeToContractPendingTxs(onData, onError) {
    const web3 = services.web3.getInstance();
    web3.eth.subscribe('pendingTransactions')
        .on('data', txHash => {
            onData(txHash);
        })
        .on('error', error => {
            onError(error);
        });
}

async function loadSafeGasPrice() {
    const data = await services.fetch.get('https://ethgasstation.info/json/ethgasAPI.json');
    return data.safeLow / 10;
}

module.exports = {
    subscribeToContractPendingTxs,
    loadEthBalance,
    loadTokenBalance,
    loadTransactionCount,
    callContractMethod,
    loadCurrentBlockTime,
    loadBalance,
    loadSafeGasPrice
};
