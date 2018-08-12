import '../global';
import env from 'test/env';
import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider || env.web3Url);

describe('web3.init', () => {
  it('init', () => {
    expect(web3).not.toBeNull();
  });
});

module.exports = web3;
