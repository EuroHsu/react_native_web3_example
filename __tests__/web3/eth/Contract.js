import env from 'test/env';
import web3 from 'test/web3';

describe('web3.eth.Contract', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
      console.log(name, result);
    });
  }

  test('new contract', () => {
    return new web3.eth.Contract([], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
  });

  var myContract = new web3.eth.Contract([], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
    from: '0x1234567890123456789012345678901234567891', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
  });

  test('options', () => myContract.options);

  test('options.address', () => myContract.options.address);

  test('options.jsonInterface', () => myContract.options.jsonInterface);

  test('clone', () => myContract.clone());

  test('deploy.encodeABI', () => myContract.deploy({
    data: '0x1234567890123456789012345678901234567891',
    arguments: [123, 'My String']
  }).encodeABI());

  test('deploy.estimateGas', () => myContract.deploy({
    data: '0x1234567890123456789012345678901234567891',
    arguments: [123, 'My String']
  }).estimateGas());

});
