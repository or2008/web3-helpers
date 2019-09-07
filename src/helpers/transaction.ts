import InputDataDecoder from 'ethereum-input-data-decoder';
import { AbiItem } from 'web3-utils';
import { Transaction } from 'web3-core';

export interface DecodedTxInput {
    method: string;
    types: string[];
    inputs: string[];
    names: string[];
}
export function decodeTxInputData(txInput: string, abi: AbiItem | AbiItem[]): DecodedTxInput {
    const decoder = new InputDataDecoder(abi);
    return decoder.decodeData(txInput);
}

export function calculateTxFeeCost(tx: Transaction): number {
    return tx.gas * Number(tx.gasPrice);
}

export function getFunctionName(tx: Transaction, abi: AbiItem | AbiItem[]): string {
    return decodeTxInputData(tx.input, abi).method;
}

export function getDecodedInputs(tx: Transaction, abi: AbiItem | AbiItem[]): any[]{
    return decodeTxInputData(tx.input, abi).inputs;
}