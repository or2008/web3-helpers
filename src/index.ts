import Web3 from 'web3';
import * as utils from './utils';
import * as actions from './actions';
import * as helpers from './helpers';
import * as services from './services';

export class Web3Helpers {
    public constructor(web3ProviderPath = 'ws://127.0.0.1:8546') {
        services.web3.init(web3ProviderPath);
    }

    public getWeb3Instance(): Web3 {
        return services.web3.getInstance();
    }

    public utils = utils;
    public actions = actions;
    public helpers = helpers;
}
