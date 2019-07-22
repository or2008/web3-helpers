import { expect } from "chai";
import { utils } from '../../src/';

describe('Math Utils', (): void => {
    it('add', (): void => {
        const n1 = "1000000000000000000";
        const n2 = 3000000000000000000;

        const res = utils.number.add(n1, n2);
        expect(res).equal("4000000000000000000");
    });

    it('substrac', (): void => {
        const n1 = 3000000000000000000;
        const n2 = "1000000000000000000";

        const res = utils.number.sub(n1, n2);
        expect(res).equal("2000000000000000000");
    });

    it('multiply', (): void => {
        const n1 = 3000000000000000000;
        const n2 = '2';

        const res = utils.number.mul(n1, n2);
        expect(res).equal("6000000000000000000");
    });

    it('divide', (): void => {
        const n1 = 3000000000000000000;
        const n2 = '2';

        const res = utils.number.div(n1, n2);
        expect(res).equal("1500000000000000000");
    });
});

describe('Wei Utils', (): void => {
    it('convert to wei (18 decimals)', (): void => {
        const n1 = 3;
        const res = utils.number.toWei(n1);

        expect(res).equal('3000000000000000000');
    });

    it('convert to wei (6 decimals)', (): void => {
        const n1 = 3;
        const res = utils.number.toWei(n1, 6);

        expect(res).equal('3000000');
    });

    it('convert from wei (18 decimals)', (): void => {
        const n1 = 3000000000000000000;
        const res = utils.number.fromWei(n1);

        expect(res).equal('3');
    });

    it('convert from wei (6 decimals)', (): void => {
        const n1 = 3000000;
        const res = utils.number.fromWei(n1, 6);

        expect(res).equal('3');
    });
});