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

  test('methods.amountRaised.call', () => myContract.methods.amountRaised().call());

  test('methods.owner.call', () => myContract.methods.owner().call());

  test('methods.withdraw.send', () => myContract.methods.withdraw().send({from: account}));

  test('methods.withdraw.estimateGas', () => myContract.methods.withdraw().estimateGas());

  test('methods.withdraw.encodeABI', () => myContract.methods.withdraw().encodeABI());

  test('events.once', () => myContract.once('Feedback', () => {}));

  test('events.Feedback', () => myContract.events.Feedback());

  test('events.allEvents', () => myContract.events.allEvents());

  test('events.getPastEvents', () => myContract.getPastEvents('Feedback'));

  test('sendSignedMethodTransaction', async () => {
    let nonce = await web3.eth.getTransactionCount(account, 'pending');
    let txMethodData = await myContract.methods.withdraw().encodeABI();
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

  myContract.once('Feedback', (err, event) => {
    showLog('events.once', err, event);
  });

  myContract.events.Feedback((err, event) => {
    showLog('events.Feedback', err, event);
  });

  myContract.events.allEvents((err, event) => {
    showLog('events.allEvents', err, event);
  });
});
