import contract from 'test/contract';
import EthUtils from 'ethereumjs-util';
import env from 'test/env';
import Tx from 'ethereumjs-tx';
import web3 from 'test/web3';
let account = EthUtils.privateToAddress(Buffer.from(env.privateKey, 'hex')).toString('hex');
jest.setTimeout(30000);

let contractAddress = contract.address;
let contractBytecode = contract.bytecode;
let contractAbi = contract.abi;

describe('web3.eth.Contract', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  let showLog = (name, err, result) => {
    if (err) console.log(name, err.message);
    else console.log(name, 'ok');
  }

  var myContract = new web3.eth.Contract(contractAbi, contractAddress);

  test('new contract', () => {
    return myContract;
  });

  test('options', () => myContract.options);

  test('options.address', () => myContract.options.address);

  test('options.jsonInterface', () => myContract.options.jsonInterface);

  test('clone', () => myContract.clone());

  test('deploy.encodeABI', () => myContract.deploy({
    data: contractBytecode
  }).encodeABI());

  test('deploy.estimateGas', () => myContract.deploy({
    data: contractBytecode
  }).estimateGas());

  test('deploy.send', () =>
    myContract.deploy({
      data: contractBytecode
    }).send({
      from: account,
      gas: 1500000,
      gasPrice: '0x2540be400'
    })
  );

  test('methods', () => myContract.methods);

  test('methods.owner.call', () => myContract.methods.owner().call());

  test('methods.set(666).send', () => myContract.methods.set(666).send({from: account}));

  test('methods.get().call', () => myContract.methods.get().call());

  test('methods.set(666).estimateGas', () => myContract.methods.set(666).estimateGas());

  test('methods.set(666).encodeABI', () => myContract.methods.set(666).encodeABI());

  test('events.once(NewValueSet)', () => myContract.once('NewValueSet', () => {}));

  test('events.NewValueSet', () => myContract.events.NewValueSet());

  test('events.allEvents', () => myContract.events.allEvents());

  test('events.getPastEvents(NewValueSet)', () => myContract.getPastEvents('NewValueSet', {
    fromBlock: 0,
    toBlock: 'latest'
  }));

  test('sendSignedMethodTransaction', async () => {
    let nonce = await web3.eth.getTransactionCount(account, 'pending');
    nonce = web3.utils.toHex(nonce);
    let txMethodData = await myContract.methods.set(nonce).encodeABI();
    var rawTx = {
      nonce: nonce,
      gas: 4700000,
      gasPrice: '0x2540be400',
      from: account,
      to: contractAddress,
      value: '0x00',
      data: txMethodData
    }
    var tx = new Tx(rawTx);
    tx.sign(Buffer.from(env.privateKey, 'hex'));
    return web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
  });

  myContract.once('NewValueSet', (err, event) => {
    showLog('events.once(NewValueSet, callback)', err, event);
  });

  myContract.events.NewValueSet((err, event) => {
    showLog('events.NewValueSet(callback)', err, event);
  });

  myContract.events.allEvents((err, event) => {
    showLog('events.allEvents(callback)', err, event);
  });

  myContract.getPastEvents('NewValueSet', {
    fromBlock: 0,
    toBlock: 'latest'
  }, (err, event) => {
    showLog('events.getPastEvents(NewValueSet, callback)', err, event);
  });
});
