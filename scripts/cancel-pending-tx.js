const config = require('../config');
const actions = require('../actions');

const txHash = '0xc2feeda7f3723c515ed40b7b1b0a1f6f9954ccf30a1dd3c2dc0a215f19af07c2';
const privateKey = '0x';

actions.transaction.cancelPendingTx(txHash, privateKey);
