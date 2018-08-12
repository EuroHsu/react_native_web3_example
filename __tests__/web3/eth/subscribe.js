import web3 from 'test/web3';

describe('web3.eth.subscribe', () => {
  let test = (name, functions) => {
    it(name, async () => {
      // let result = await functions();
    });
  }

  // pendingTransactions, newBlockHeaders, syncing, logs
  test('subscribe("pendingTransactions")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('pendingTransactions', (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
      .on("data", (transaction) => {
      });
  
      subscription.unsubscribe((err, success) => {
      });
    });
  });

  test('subscribe("newBlockHeaders")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('newBlockHeaders', (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
      .on("data", (blockHeader) => {
      });
  
      subscription.unsubscribe((err, success) => {
      });
    });
  });

  test('subscribe("syncing")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('syncing', (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
      .on("data", (sync) => {
      })
      .on("changed", (isSyncing) => {
        if(isSyncing) {
            // stop app operation
        } else {
            // regain app operation
        }
      });
  
      subscription.unsubscribe((err, success) => {
      });
    });
  });

  test('subscribe("logs")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('logs', {
        address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        topics: ['0x12345...']
      }, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      })
      .on("data", (transaction) => {
      })
      .on("changed", (log) => {
      });
  
      subscription.unsubscribe((err, success) => {
      });
    });
  });

  test('clearSubscriptions', () => web3.eth.clearSubscriptions());
});
