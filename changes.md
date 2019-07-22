Breaking changes:
----------------

- callContractMethod, move contractAddress param to be optional and to be after methodName
- subscribeToContractPendingTxs - rename to subscribeToPendingTxs and remove callbacks use it like that:
```
        subscribeToPendingTxs.on('data', txHash => {
            onData(txHash);
        })
        .on('error', error => {
            onError(error);
        });
```
- sendSignedTransaction - return RxJS instead of promise resolve/reject
- cancelPendingTx - last param is gasPrice addition, not customGasPrice like was before