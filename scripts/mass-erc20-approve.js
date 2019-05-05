const currencyDB = require('../db/currency');
const relayDB = require('../plugins/uniswap/db/relay');
const transactionActions = require('../actions/transactions');
const blockchainActions = require('../actions/blockchains');
const erc20Abi = require('../erc20-abi.json');
const globalUtils = require('../utils');
const config = require('../config');
const { logger } = require('../utils/logger');

// const currencyCodes = currencyDB.data.map(currency => currency.code);
const currencyCodes = ['COLR', 'IMMO']; // 'SPANK', 'GRID', 'NMR'
console.log(currencyCodes);

function buildApproveTx(currency, txCount) {
    // ROPSTEN
    // const erc20ContractAddress = '0x2f45b6fb2f28a73f110400386da31044b2e953d4';
    // const spenderAddress = '0x59De624102d43127029A301f7Ac43Fa102D47302';
    const amountWei = '1000000000000000000000000000000000000000000000';
    const erc20ContractAddress = currency.contractAddress;
    // const relay = relayDB.getRelayByCurrencyCode(currency.code);
    // const spenderAddress = relay.relayContractAddress;
    const spenderAddress = config.getPistonFrContractAddress();

    const txParams = {
        nonce: globalUtils.toHex(txCount),
        gasPrice: globalUtils.toHex(2000000000),
        gas: globalUtils.toHex(120000),
        to: erc20ContractAddress,
        value: 0,
        data: transactionActions.buildContractMethodTxData(erc20Abi, 'approve', spenderAddress, amountWei)
    };

    logger.debug(`building approve tx for ${currency.code}'s Relay`, txParams);

    return txParams;
}

async function run() {
    logger.debug('Running Mass ERC20 Approve txs..');
    const walletAddress = config.getFrontRunWalletAddress();
    const privateKey = config.getFrontRunningPrivateKey();
    // const walletAddress = '0x866E2c668b262aa0a783d4A79cf7d3373208fDdC';
    // const privateKey = '0xF78AA1859A74C8F856A42FC93A5823E8437DB0CBDBE623A446E735B7E9289ED1';

    let initialTxCount = await blockchainActions.loadTransactionCount(walletAddress);

    currencyDB.getByCurrencyCodes(currencyCodes).forEach(async currency => {
        const rawTx = buildApproveTx(currency, initialTxCount++);
        const signedTx = transactionActions.signTransaction(rawTx, privateKey);
        const txRes = await transactionActions.sendSignedTransaction(signedTx, 1);
        logger.debug('sent ApproveTx to blockchain', txRes);
    });

    logger.debug('Total approves:', currencyDB.data.length);
}

run();
