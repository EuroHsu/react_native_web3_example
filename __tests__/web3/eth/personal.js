import EthUtils from 'ethereumjs-util';
import env from 'test/env';
import web3 from 'test/web3';
let account = EthUtils.privateToAddress(Buffer.from(env.privateKey, 'hex')).toString('hex');

describe('web3.eth.personal', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('newAccount', () => web3.eth.personal.newAccount(env.password));

  test('sign', async () => web3.eth.personal.sign('Hello world', account, env.password));

  test('ecRecover', () => web3.eth.personal.ecRecover('Hello world', '0x20aeb72c4f46199089d597de7bbe75ad4bc64d842791dafbccd21d905d7aa5586f79425e8677fb568fcf01a29ae0fc866db2ee549a3321a7b7a2976009881db21b'));

  test('signTransaction', async () => {
    let nonce = await web3.eth.getTransactionCount(account);
    return web3.eth.personal.signTransaction({
      nonce: nonce,
      from: account,
      gasPrice: '0x2540be400',
      gas: 21000,
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: ''
    }, env.password);
  });

  test('unlockAccount', async () => web3.eth.personal.unlockAccount(account, env.password, 600));
});
