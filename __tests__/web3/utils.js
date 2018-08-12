import BigNumber from 'bignumber.js';
import web3 from 'test/web3';
let BN = web3.utils.BN;

describe('web3.utils', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('randomHex', () => web3.utils.randomHex(32));

  test('_.union', () => web3.utils._.union([1,2],[3]));
  
  test('_.each', () => web3.utils._.each({my: 'object'}, () => {}));
  
  test('isBN', () => web3.utils.isBN(new BN(10)));
  
  test('isBigNumber', () => web3.utils.isBigNumber(new BigNumber(10)));
  
  test('sha3', () => web3.utils.sha3('1'));
  
  test('soliditySha3', () => web3.utils.soliditySha3('1'));
  
  test('isHex', () => web3.utils.isHex(0xc1912));
  
  test('isHexStrict', () => web3.utils.isHexStrict(0xc1912));
  
  test('isAddress', () => web3.utils.isAddress('0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe'));
  
  test('toChecksumAddress', () => web3.utils.toChecksumAddress('0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe'));
  
  test('checkAddressChecksum', () => web3.utils.checkAddressChecksum('0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe'));
  
  test('toHex', () => web3.utils.toHex('234'));
  
  test('toBN', () => web3.utils.toBN('234').toString());
  
  test('hexToNumberString', () => web3.utils.hexToNumberString('0xea'));
  
  test('hexToNumber', () => web3.utils.hexToNumber('0xea'));
  
  test('toDecimal', () => web3.utils.toDecimal('0xea'));
  
  test('numberToHex', () => web3.utils.numberToHex('234'));
  
  test('fromDecimal', () => web3.utils.fromDecimal('234'));
  
  test('hexToUtf8', () => web3.utils.hexToUtf8('0x4920686176652031303021'));
  
  test('hexToString', () => web3.utils.hexToString('0x4920686176652031303021'));
  
  test('toUtf8', () => web3.utils.toUtf8('0x4920686176652031303021'));
  
  test('hexToAscii', () => web3.utils.hexToAscii('0x4920686176652031303021'));
  
  test('toAscii', () => web3.utils.toAscii('0x4920686176652031303021'));
  
  test('utf8ToHex', () => web3.utils.utf8ToHex('I have 100!'));
  
  test('stringToHex', () => web3.utils.stringToHex('I have 100!'));
  
  test('fromUtf8', () => web3.utils.fromUtf8('I have 100!'));
  
  test('asciiToHex', () => web3.utils.asciiToHex('I have 100!'));
  
  test('fromAscii', () => web3.utils.fromAscii('I have 100!'));
  
  test('hexToBytes', () => web3.utils.hexToBytes('0x48656c6c6f2125'));
  
  test('bytesToHex', () => web3.utils.bytesToHex([ 72, 101, 108, 108, 111, 33, 36 ]));
  
  test('toWei', () => web3.utils.toWei('1', 'ether'));
  
  test('fromWei', () => web3.utils.fromWei('1', 'ether'));
  
  test('unitMap', () => web3.utils.unitMap);
  
  test('padLeft', () => web3.utils.padLeft('0x3456ff', 20));
  
  test('leftPad', () => web3.utils.leftPad('0x3456ff', 20));
  
  test('padRight', () => web3.utils.padRight('0x3456ff', 20));
  
  test('rightPad', () => web3.utils.rightPad('0x3456ff', 20));
  
  test('toTwosComplement', () => web3.utils.toTwosComplement('-1'));
});
