import env from 'test/env';
import web3 from 'test/web3';

describe('web3.eth.accounts', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('create', () => web3.eth.accounts.create());

  test('privateKeyToAccount', () => web3.eth.accounts.privateKeyToAccount(env.privateKey));

  test('signTransaction', () => web3.eth.accounts.signTransaction({
    to: '0x0000000000000000000000000000000000000000',
    value: '0',
    gas: 2000000
  }, env.privateKey));

  test('recoverTransaction', () => web3.eth.accounts.recoverTransaction('0xf86580850430e23400831e8480940000000000000000000000000000000000000000808026a0d904ce255ccf4df06f42f1469928460940cb8e2ccb8410154b5ea26c6f4e6b3ba016625c99465e3ddbc425dc77c76f7fd8e0b8281353b060f3f2a12be7ecdc288b'));  

  test('hashMessage', () => web3.eth.accounts.hashMessage('Hello World'));
  
  test('sign', () => web3.eth.accounts.sign('Hello World', env.privateKey));

  test('recover', () => web3.eth.accounts.recover({
    messageHash: '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2',
    v: '0x1b',
    r: '0xd53fbf818ae300151088ad27cf31716f08844bab569f91373cf9071b059bd306',
    s: '0x6a45eab0a6efd86b4f6c9bcee44edfba2520b7e59af9478a7f8895a98782ee5f'
  }));

  test('recover', () => web3.eth.accounts.recover(
    'Hello World',
    '0xd53fbf818ae300151088ad27cf31716f08844bab569f91373cf9071b059bd3066a45eab0a6efd86b4f6c9bcee44edfba2520b7e59af9478a7f8895a98782ee5f1b'
  ));

  test('recover', () => web3.eth.accounts.recover(
    'Hello World',
    '0x1b',
    '0xd53fbf818ae300151088ad27cf31716f08844bab569f91373cf9071b059bd306',
    '0x6a45eab0a6efd86b4f6c9bcee44edfba2520b7e59af9478a7f8895a98782ee5f'
  ));

  test('encrypt', () => web3.eth.accounts.encrypt(env.privateKey, env.password));

  test('decrypt', () => {
    let keystoreJsonV3 = web3.eth.accounts.encrypt(env.privateKey, env.password);
    return web3.eth.accounts.decrypt(keystoreJsonV3, env.password);
  });

  test('wallet', () => web3.eth.accounts.wallet);

  test('wallet.add', () => web3.eth.accounts.wallet.add(env.privateKey));

  test('wallet.encrypt', () => web3.eth.accounts.wallet.encrypt('test'));

  test('wallet.decrypt', () => web3.eth.accounts.wallet.decrypt(web3.eth.accounts.wallet.encrypt('test'), 'test'));

  test('wallet.remove', () => web3.eth.accounts.wallet.remove(web3.eth.accounts.privateKeyToAccount(env.privateKey).address));

  test('wallet.clear', () => web3.eth.accounts.wallet.clear());
});
