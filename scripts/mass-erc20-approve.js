const actions = require('../actions');
const erc20Abi = require('../erc20-abi.json');
const globalUtils = require('../utils');
const config = require('../config');
const helpers = require('../helpers');

const currencyCodes = ['LQD', 'HUM', 'SXUT'];
console.log(currencyCodes);

function buildApproveTx(currency, txCount) {
    const amountWei = '1000000000000000000000000000000000000000000000';
    const erc20ContractAddress = currency.contractAddress;
    const spenderAddress = config.getPistonFrContractAddress();

    const txParams = {
        nonce: globalUtils.toHex(txCount),
        gasPrice: globalUtils.toHex(15000000000),
        gas: globalUtils.toHex(120000),
        to: erc20ContractAddress,
        value: 0,
        data: actions.transaction.buildContractMethodTxData(erc20Abi, 'approve', spenderAddress, amountWei)
    };

    console.log(`building approve tx for ${currency.code}'s Relay`, txParams);

    return txParams;
}

async function run() {
    console.log('Running Mass ERC20 Approve txs..');
    const walletAddress = config.getFrontRunWalletAddress();
    const privateKey = config.getFrontRunningPrivateKey();
    let initialTxCount = await actions.blockchain.loadTransactionCount(walletAddress);

    helpers.getByCurrencyCodes(currencyCodes).forEach(async currency => {
        const rawTx = buildApproveTx(currency, initialTxCount++);
        const signedTx = actions.transaction.signTransaction(rawTx, privateKey);
        const txRes = await actions.transaction.sendSignedTransaction(signedTx, 1);
        console.log('sent ApproveTx to blockchain', txRes);
    });
}

run();
