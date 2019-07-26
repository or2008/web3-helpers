import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 150 });

export function fromWei(num: BigNumber.Value, decimalDigits = 18): string {
    return new BigNumber(num).times(1 / 10 ** decimalDigits).toFixed();
}

export function toWei(num: BigNumber.Value, decimalDigits = 18): string {
    return new BigNumber(num).times(10 ** decimalDigits).toFixed();
}

// Big math
export function add(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.plus(n2).toFixed();
}

export function sub(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.minus(n2).toFixed();
}

export function div(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.div(n2).toFixed();
}

export function mul(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.times(n2).toFixed();
}

export function toFixed(n1: BigNumber.Value, decimals = 0): string {
    n1 = new BigNumber(n1);
    return n1.toFixed(decimals);
}

export function isLessThan(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.isLessThan(n2).toFixed();
}

export function isLessThanOrEqualTo(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.isLessThanOrEqualTo(n2).toFixed();
}

export function isGreaterThan(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.isGreaterThan(n2).toFixed();
}

export function isGreaterThanOrEqualTo(n1: BigNumber.Value, n2: BigNumber.Value): string {
    n1 = new BigNumber(n1);
    return n1.isLessThanOrEqualTo(n2).toFixed();
}