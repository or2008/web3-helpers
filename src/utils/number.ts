import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 150 });

export function fromWei(num: BigNumber.Value, decimalDigits = 18): string {
    return new BigNumber(num).times(1 / 10 ** decimalDigits).toFixed(0, 1);
}

export function toWei(num: BigNumber.Value, decimalDigits = 18): string {
    return new BigNumber(num).times(10 ** decimalDigits).toFixed(0, 1);
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
    return n1.times(n2).toFixed(0, 1);
}

export function toFixed(n1: BigNumber.Value, decimals = 0, rm?: number): string {
    n1 = new BigNumber(n1);
    return n1.toFixed(decimals, rm);
}

export function isLessThan(n1: BigNumber.Value, n2: BigNumber.Value): boolean {
    n1 = new BigNumber(n1);
    return n1.isLessThan(n2);
}

export function isLessThanOrEqualTo(n1: BigNumber.Value, n2: BigNumber.Value): boolean {
    n1 = new BigNumber(n1);
    return n1.isLessThanOrEqualTo(n2);
}

export function isGreaterThan(n1: BigNumber.Value, n2: BigNumber.Value): boolean {
    n1 = new BigNumber(n1);
    return n1.isGreaterThan(n2);
}

export function isGreaterThanOrEqualTo(n1: BigNumber.Value, n2: BigNumber.Value): boolean {
    n1 = new BigNumber(n1);
    return n1.isLessThanOrEqualTo(n2);
}

export function min(...n: BigNumber.Value[]): string {
    return BigNumber.minimum(...n).toFixed(0, 1);
}

export function max(...n: BigNumber.Value[]): string {
    return BigNumber.maximum(...n).toFixed(0, 1);
}

export function abs(n): string {
    return new BigNumber(n).abs().toString();
}
