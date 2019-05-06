const web3Service = require('../services/web3');
const Decimal = require('decimal.js');

function toHex(value) {
    const web3 = web3Service.getInstance();
    return web3.utils.toHex(value);
}

function numberToHex(num) {
    let hexString = num.toString(16);
    if (hexString.length % 2)
        hexString = '0' + hexString;

    return `0x${hexString}`;
}

function fromWei(number, decimalDigits = 18) {
    Decimal.set({ precision: 400 });
    return new Decimal(number).times(1 / 10 ** decimalDigits).toNumber();
}

function toWei(number, decimalDigits = 18) {
    const roundedNumber = this.roundDownByDecimals(number, decimalDigits);
    return new Decimal(roundedNumber).times(10 ** decimalDigits).toFixed();
}

function roundDownByDecimals(number, decimalPlaces = 4) {
    return new Decimal(number).toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN).toFixed();
}

module.exports = {
    toHex,
    numberToHex,
    roundDownByDecimals,
    fromWei,
    toWei
};
