const InputDataDecoder = require('ethereum-input-data-decoder');

function decodeTxInputData(txInput, abi) {
    const decoder = new InputDataDecoder(abi);
    return decoder.decodeData(txInput);
}

function calculateTxFeeCost(tx) {
    return tx.gas * tx.gasPrice;
}

module.exports = {
    decodeTxInputData,
    calculateTxFeeCost
};
