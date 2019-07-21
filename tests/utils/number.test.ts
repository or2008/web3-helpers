import { expect } from "chai";
import * as utils from "../../src/utils";

describe('Math Utils', (): void => {
    it('add', (): void => {
        const n1 = "1000000000000000000";
        const n2 = 3000000000000000000;

        const res = utils.add(n1, n2);
        expect(res).equal("4000000000000000000");
    });

    it('substrac', (): void => {
        const n1 = 3000000000000000000;
        const n2 = "1000000000000000000";

        const res = utils.sub(n1, n2);
        expect(res).equal("2000000000000000000");
    });

    it('multiply', (): void => {
        const n1 = 3000000000000000000;
        const n2 = '2';

        const res = utils.mul(n1, n2);
        expect(res).equal("6000000000000000000");
    });

    it('divide', (): void => {
        const n1 = 3000000000000000000;
        const n2 = '2';

        const res = utils.div(n1, n2);
        expect(res).equal("1500000000000000000");
    });
});

describe('Wei Utils', (): void => {
    it('convert to wei (18 decimals)', (): void => {
        const n1 = 3;
        const res = utils.toWei(n1);

        expect(res).equal('3000000000000000000');
    });

    it('convert to wei (6 decimals)', (): void => {
        const n1 = 3;
        const res = utils.toWei(n1, 6);

        expect(res).equal('3000000');
    });

    it('convert from wei (18 decimals)', (): void => {
        const n1 = 3000000000000000000;
        const res = utils.fromWei(n1);

        expect(res).equal('3');
    });

    it('convert from wei (6 decimals)', (): void => {
        const n1 = 3000000;
        const res = utils.fromWei(n1, 6);

        expect(res).equal('3');
    });
});