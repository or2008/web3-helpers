const { MultiBlockchainWallet } = require('multi-blockchain-wallet/dist/index.node');
const services = require('../services');
const utils = require('../utils');
const globalHelpers = require('../helpers');

exports.signTransaction = (rawTx, privateKey) => {
    return MultiBlockchainWallet.signTransaction('ethereum', rawTx, privateKey);
};

exports.sendSignedTransaction = async (signedTx, onConfirmation, onReceipt) => {
    return new Promise((resolve, reject) => {
        const web3 = services.web3.getInstance();

        return web3.eth.sendSignedTransaction(signedTx)
            .on('transactionHash', async txHash => {
                resolve(txHash);
            })
            .on('receipt', receipt => {
                onReceipt(receipt);
            })
            .on('confirmation', async confirmation => {
                onConfirmation(confirmation);
            })
            .on('error', err => {
                reject(err.message);
            });
    });
};

exports.loadTx = async (txHash) => {
    const web3 = services.web3.getInstance();
    const tx = await web3.eth.getTransaction(txHash);
    return tx;
}

exports.cancelPendingTx = async (txHash, privateKey, customGasPrice) => {
    const web3 = services.web3.getInstance();
    const tx = await web3.eth.getTransaction(txHash);
    const gasPrice = customGasPrice ? customGasPrice : Number(tx.gasPrice) + 1000000000;
    const rawTx = this.buildRawTx(tx.nonce, tx.from, 0, gasPrice, 21000);

    const signedTx = this.signTransaction(rawTx, privateKey);
    this.sendSignedTransaction(signedTx);
};

exports.buildContractMethodTxData = (contractAbi, txMethod, ...args) => {
    const web3 = services.web3.getInstance();
    const contract = new web3.eth.Contract(contractAbi, this.to);
    const data = contract.methods[txMethod](...args).encodeABI();

    return data;
};

exports.buildRawTx = (txCount, toAddress, ethAmount, gasPrice, gas, data = null) => {
    const ethAmountWei = globalHelpers.formatToWei('ETH', ethAmount);
    const txParams = {
        nonce: utils.number.toHex(txCount),
        gasPrice: utils.number.toHex(gasPrice),
        gas: utils.number.toHex(gas),
        to: toAddress,
        value: utils.number.toHex(ethAmountWei),
        data: data
    };

    return txParams;
};
