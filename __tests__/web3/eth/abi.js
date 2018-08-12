import web3 from 'test/web3';

describe('web3.eth.abi', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('encodeFunctionSignature', () => web3.eth.abi.encodeFunctionSignature('myMethod(uint256,string)'));

  test('encodeEventSignature', () => web3.eth.abi.encodeEventSignature('myEvent(uint256,bytes32)'));
  
  test('encodeParameter', () => web3.eth.abi.encodeParameter('uint256', '2345675643'));
  
  test('encodeParameters', () => web3.eth.abi.encodeParameters(['uint256','string'], ['2345675643', 'Hello!']));
  
  test('encodeFunctionCall', () => web3.eth.abi.encodeFunctionCall({
      name: 'myMethod',
      type: 'function',
      inputs: [{
          type: 'uint256',
          name: 'myNumber'
      },{
          type: 'string',
          name: 'myString'
      }]
  }, ['2345675643', 'Hello!%']));
  
  test('decodeParameter', () => web3.eth.abi.decodeParameter('uint256', '0x000000000000000000000000000000000000000000000000000000008bd02b7b'));
  
  test('decodeParameters', () => web3.eth.abi.decodeParameters(['uint256', 'string'], '0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000648656c6c6f210000000000000000000000000000000000000000000000000000'));
  
  test('decodeLog', () => web3.eth.abi.decodeLog([{
          type: 'string',
          name: 'myString'
      },{
          type: 'uint256',
          name: 'myNumber',
          indexed: true
      },{
          type: 'uint8',
          name: 'mySmallNumber',
          indexed: true
      }],
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
      ['0x000000000000000000000000000000000000000000000000000000000000f310', '0x0000000000000000000000000000000000000000000000000000000000000010']
  ));
});
