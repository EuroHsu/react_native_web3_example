import env from 'test/env';
import web3 from 'test/web3';

describe('web3.shh', () => {
  let test = (name, functions) => {
    it(name, async () => {
      let result = await functions();
    });
  }

  test('nothing', () => {});
});
