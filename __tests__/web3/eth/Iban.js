import web3 from 'test/web3';

describe('web3.eth.Iban', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }


  test('toAddress', () => web3.eth.Iban.toAddress('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'));

  test('toIban', () => web3.eth.Iban.toIban('0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8'));

  test('fromAddress', () => web3.eth.Iban.fromAddress('0x00c5496aEe77C1bA1f0854206A26DdA82a81D6D8'));

  test('fromBban', () => web3.eth.Iban.fromBban('ETHXREGGAVOFYORK'));
  
  test('createIndirect', () => web3.eth.Iban.createIndirect({
    institution: "XREG",
    identifier: "GAVOFYORK"
  }));
  
  test('isValid', () => web3.eth.Iban.isValid('XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS'));

  let iban = new web3.eth.Iban("XE81ETHXREGGAVOFYORK");
  
  test('prototype.isValid', () => iban.isValid());
  
  test('prototype.isDirect', () => iban.isDirect());
  
  test('prototype.isIndirect', () => iban.isIndirect());
  
  test('prototype.checksum', () => iban.checksum());
  
  test('prototype.institution', () => iban.institution());
  
  test('prototype.client', () => iban.client());
  
  test('prototype.toAddress', () => iban.toAddress());
  
  test('prototype.toString', () => iban.toString());
});
