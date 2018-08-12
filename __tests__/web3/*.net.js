import web3 from 'test/web3';

describe('web3.eth.net', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('getId', () => web3.eth.net.getId());

  test('isListening', () => web3.eth.net.isListening());

  test('getPeerCount', () => web3.eth.net.getPeerCount());
});

describe('web3.bzz.net', () => {
  let test = (name, functions) => {
    it(name, async () => {
      // let result = await functions();
    });
  }

  test('getId', () => web3.bzz.net.getId());

  test('isListening', () => web3.bzz.net.isListening());

  test('getPeerCount', () => web3.bzz.net.getPeerCount());
});

describe('web3.shh.net', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('getId', () => web3.shh.net.getId());

  test('isListening', () => web3.shh.net.isListening());

  test('getPeerCount', () => web3.shh.net.getPeerCount());
});
