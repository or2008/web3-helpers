const currencyDB = require('../db/currency');
const utils = require('../utils');

function getByCurrencyCode(code) {
    return currencyDB.find(currency => currency.code == code);
}

function getByContractAddress(contractAddress) {
    const formatedContractAddress = contractAddress.startsWith('0x') ? contractAddress : `0x${contractAddress}`;
    return currencyDB.find(currency => currency.contractAddress.toLowerCase() == formatedContractAddress.toLowerCase());
}

function getDecimalsDigits(code) {
    const currency = getByCurrencyCode(code);
    return currency.decimalsDigits;
}

function getByCurrencyCodes(codes = []) {
    return codes.map(currencyCode => getByCurrencyCode(currencyCode));
}

function getCurrencyCodeByContractAddress(contractAddress) {
    const currency = getByContractAddress(contractAddress);
    return currency.code;
}

function getTokenContractAddress(currencyCode) {
    const currency = getByCurrencyCode(currencyCode);
    return currency.contractAddress;
}

function getDecimalDigits(currencyCode) {
    if (currencyCode == 'ETH') return 18;

    return getDecimalsDigits(currencyCode);
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
    formatToWei,
    getByCurrencyCode,
    getByContractAddress,
    getByCurrencyCodes
};
