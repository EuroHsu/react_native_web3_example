import web3 from 'test/web3';
import contract from 'test/contract';

describe('web3.eth.subscribe', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('subscribe("pendingTransactions")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('pendingTransactions', (err, result) => {
        if (err) {
          return reject(err);
        }
        subscription.unsubscribe((err, success) => {
          resolve(result);
        });
      });
    });
  });

  test('subscribe("newBlockHeaders")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('newBlockHeaders', (err, result) => {
        if (err) {
          return reject(err);
        }
        subscription.unsubscribe((err, success) => {
          resolve(result);
        });
      });
    });
  });

  test('subscribe("syncing")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('syncing', (err, result) => {
        if (err) {
          return reject(err);
        }
        subscription.unsubscribe((err, success) => {
          resolve(result);
        });
      });
    });
  });

  test('subscribe("logs")', () => {
    return new Promise((resolve, reject) => {
      var subscription = web3.eth.subscribe('logs', {
        address: contract.address,
        topics: []
      }, (err, result) => {
        if (err) {
          return reject(err);
        }
        subscription.unsubscribe((err, success) => {
          resolve(result);
        });
      });
    });
  });

  test('clearSubscriptions', () => web3.eth.clearSubscriptions());
});
