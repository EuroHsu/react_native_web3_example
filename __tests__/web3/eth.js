import EthUtils from 'ethereumjs-util';
import env from 'test/env';
import Tx from 'ethereumjs-tx';
import web3 from 'test/web3';
let account = EthUtils.privateToAddress(Buffer.from(env.privateKey, 'hex')).toString('hex');
jest.setTimeout(30000);

describe('web3.eth', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('defaultAccount', () => web3.eth.defaultAccount);

  test('defaultBlock', () => web3.eth.defaultBlock);

  test('getProtocolVersion', () => web3.eth.getProtocolVersion());

  test('isSyncing', () => web3.eth.isSyncing());

  test('getCoinbase', () => web3.eth.getCoinbase());

  test('isMining', () => web3.eth.isMining());

  test('getHashrate', () => web3.eth.getHashrate());

  test('getGasPrice', () => web3.eth.getGasPrice());

  test('getAccounts', () => web3.eth.getAccounts());

  test('getBlockNumber', () => web3.eth.getBlockNumber());

  test('getBalance', () => web3.eth.getBalance(account));

  test('getStorageAt', () => web3.eth.getStorageAt(account));

  test('getCode', () => web3.eth.getCode(account));

  test('getBlock', () => web3.eth.getBlock('latest'));

  test('getBlockTransactionCount', () => web3.eth.getBlockTransactionCount('latest'));

  test('getUncle', () => web3.eth.getUncle('latest', 0));

  test('getTransaction', () => web3.eth.getTransaction('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'));

  test('getTransactionFromBlock', () => web3.eth.getTransactionFromBlock('latest', 0));

  test('getTransactionReceipt', () => web3.eth.getTransactionReceipt('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'));

  test('getTransactionCount', () => web3.eth.getTransactionCount(account));

  test('sendTransaction', () => web3.eth.sendTransaction({
    from: account,
    to: '0x0000000000000000000000000000000000000000',
    value: '0'
  }));

  test('sendSignedTransaction', async () => {
    let nonce = await web3.eth.getTransactionCount(account, 'pending');
    nonce = web3.utils.toHex(nonce);
    var rawTx = {
      nonce: nonce,
      gas: 21000,
      gasPrice: '0x2540be400',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: ''
    }
    var tx = new Tx(rawTx);
    tx.sign(Buffer.from(env.privateKey, 'hex'));
    return web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
  });

  test('sign', () => web3.eth.sign('Hello world', account));

  test('signTransaction', async () => {
    let nonce = await web3.eth.getTransactionCount(account, 'pending');
    nonce = web3.utils.toHex(nonce);
    return web3.eth.signTransaction({
      nonce: nonce,
      from: account,
      gas: 21000,
      gasPrice: '0x2540be400',
      to: '0x0000000000000000000000000000000000000000',
      value: '0x00',
      data: ''
    });
  });

  test('call', () => web3.eth.call({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
    data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
  }));

  test('estimateGas', () => web3.eth.estimateGas({
    to: account,
    data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
  }));

  test('getPastLogs', () => web3.eth.getPastLogs({
    address: account
  }));

  // test('getCompilers', () => web3.eth.getCompilers());

  describe('web3.eth.compile', async () => {
    let list = await web3.eth.getCompilers();
    var source = "" +
      "contract test {\n" +
      "   function multiply(uint a) returns(uint d) {\n" +
      "       return a * 7;\n" +
      "   }\n" +
      "}\n";
    list.forEach((compiler) => {
      test(compiler, () => web3.eth.compile[compiler](source));
    });
  });

  test('getWork', () => web3.eth.getWork());

  test('submitWork', () => web3.eth.submitWork(
    "0x0000000000000001",
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    "0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000"
  ));
});
