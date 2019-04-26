const currencyDB = require('../db/currency');
const utils = require('../utils');

function getCurrencyCodeByContractAddress(contractAddress) {
    const currency = currencyDB.getByContractAddress(contractAddress);
    return currency.code;
}

function getTokenContractAddress(currencyCode) {
    const currency = currencyDB.getByCurrencyCode(currencyCode);
    return currency.contractAddress;
}

function getDecimalDigits(currencyCode) {
    if (currencyCode == 'ETH') return 18;

    return currencyDB.getDecimalsDigits(currencyCode);
}

function formatFromWei(currencyCode, amount) {
    const decimalPoints = getDecimalDigits(currencyCode);
    return utils.number.fromWei(amount, decimalPoints);
}

function formatToWei(currencyCode, amount) {
    const decimalPoints = getDecimalDigits(currencyCode);
    return utils.number.toWei(amount, decimalPoints);
}

module.exports = {
    getCurrencyCodeByContractAddress,
    getTokenContractAddress,
    getDecimalDigits,
    formatFromWei,
    formatToWei
};
