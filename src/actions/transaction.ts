import * as MultiBlockchainWallet from 'multi-blockchain-wallet/dist/index.node.js';
import { IEthereumTransaction } from 'multi-blockchain-wallet/dist/plugins/ethereum';
import * as services from '../services';
import { TransactionReceipt, PromiEvent, Transaction, TransactionConfig } from 'web3-core';
import { AbiItem } from 'web3-utils';

export function signTransaction(rawTx: IEthereumTransaction, privateKey: string): string {
    return MultiBlockchainWallet.signTransaction('ethereum', rawTx, privateKey);
};

export function sendSignedTransaction(signedTx: string): PromiEvent<TransactionReceipt> {
    const web3 = services.web3.getInstance();
    return web3.eth.sendSignedTransaction(signedTx);
}

export async function loadTx(txHash: string): Promise<Transaction> {
    const web3 = services.web3.getInstance();
    return web3.eth.getTransaction(txHash);
};

export async function cancelPendingTx(txHash: string, privateKey: string, customGasPriceAddition = 1000000000): Promise<TransactionReceipt> {
    const web3 = services.web3.getInstance();
    const tx = await web3.eth.getTransaction(txHash);
    const gasPrice = Number(tx.gasPrice) + customGasPriceAddition;
    const rawTx = this.buildRawTx(tx.nonce, tx.from, 0, gasPrice, 21000);

    const signedTx = this.signTransaction(rawTx, privateKey);
    return this.sendSignedTransaction(signedTx);
};

export function buildContractMethodTxData(abi: AbiItem[] | AbiItem, txMethod: string, ...args): string {
    const web3 = services.web3.getInstance();
    const contract = new web3.eth.Contract(abi, this.to);
    return contract.methods[txMethod](...args).encodeABI();
};

export function buildRawTx(txCount: number, toAddress: string, ethAmountWei: string | number, gasPrice: string | number, gas: number | string, data?: string): TransactionConfig {
    const web3 = services.web3.getInstance();
    const txParams = {
        nonce: txCount,
        gasPrice: web3.utils.toHex(gasPrice),
        gas: web3.utils.toHex(gas),
        to: toAddress,
        value: web3.utils.toHex(ethAmountWei),
        data: data
    };

    return txParams;
};
