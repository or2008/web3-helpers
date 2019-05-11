const Web3 = require('web3');

// const providerPath = `ws://127.0.0.1:8546`;
const providerPath = `wss://ropsten.infura.io/ws/v3/72f0ba01dbe842c083a0a0b0a76f29dc`;
const eventProvider = new Web3.providers.WebsocketProvider(providerPath);
const web3 = new Web3(eventProvider);

const ownerAddress = '0x';
const privateKey = '0x';

const abi = [];
const bytecode = '0x';

web3.eth.accounts.wallet.add(privateKey);

const contract = new web3.eth.Contract(abi);

contract.deploy({
    data: bytecode,
    arguments: [ownerAddress]
}).send({
    from: ownerAddress,
    gas: 1500000,
    gasPrice: 1500000000
}, (err, txHash) => {
    console.log('send:', err, txHash);
}).on('error', error => {
    console.log('error', error);
}).on('transactionHash', transactionHash => {
    console.log('transactionHash', transactionHash);
}).on('receipt', receipt => {
    console.log('receipt', receipt.contractAddress);
}).on('confirmation', (confirmationNumber, receipt) => {
    console.log('confirmation', confirmationNumber);
});
