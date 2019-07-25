import * as services from '../services';
import { Block } from 'web3-eth';
import erc20Abi from '../abi/erc20-abi.json';
import { AbiItem } from 'web3-utils';

export async function loadBalance(contractAddress: string | 'ETH', address: string): Promise<string>   {
    if (contractAddress == 'ETH') return this.loadEthBalance(address);
    return this.loadTokenBalance(address, contractAddress);
}

export async function loadTokenBalance(address, contractAddress): Promise<string> {
    return this.callContractMethod(erc20Abi, 'balanceOf', contractAddress, address);
}

export async function loadEthBalance(address: string): Promise<string>  {
    const web3 = services.web3.getInstance();
    return web3.eth.getBalance(address);
}

export async function loadCurrentBlockNumber(): Promise<number> {
    const web3 = services.web3.getInstance();
    return web3.eth.getBlockNumber();
}

export async function loadCurrentBlock(): Promise<Block> {
    const web3 = services.web3.getInstance();
    const currentBlockNumber = await loadCurrentBlockNumber();
    return web3.eth.getBlock(currentBlockNumber);
}

export async function loadCurrentBlockTime(): Promise<string | number> {
    const currentBlock = await loadCurrentBlock();
    return currentBlock.timestamp;
}

export async function callContractMethod(abi: AbiItem[] | AbiItem, methodName: string, contractAddress?: string, ...args): Promise<string> {
    const web3 = services.web3.getInstance();
    const contract = new web3.eth.Contract(abi, contractAddress);
    const data = await contract.methods[methodName](...args).call();
    return web3.utils.isBN(data) ? data.toFixed() : data;
}

export interface EthgasAPIResponse {
    fast: number;
    fastest: number;
    safeLow: number;
    average: number;
    block_time: number;
    blockNum: number;
    speed: number;
    safeLowWait: number;
    avgWait: number;
    fastWait: number;
    fastestWait: number;

}

export async function loadGasPriceMetrics(): Promise<EthgasAPIResponse> {
    return services.fetch.get('https://ethgasstation.info/json/ethgasAPI.json');
}

export async function loadSafeLowGasPrice(): Promise<number> {
    const data = await loadGasPriceMetrics();
    return data.safeLow / 10;
}

