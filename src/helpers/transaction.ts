import InputDataDecoder from 'ethereum-input-data-decoder';
import { AbiItem } from 'web3-utils';
import { Transaction } from 'web3-core';

export function decodeTxInputData(txInput: string, abi: AbiItem | AbiItem[]): string {
    const decoder = new InputDataDecoder(abi);
    return decoder.decodeData(txInput);
}

export function calculateTxFeeCost(tx: Transaction): number {
    return tx.gas * Number(tx.gasPrice);
}
