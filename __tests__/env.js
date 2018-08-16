let env = {
  web3Url: 'wss://rinkeby.infura.io/_ws',
  privateKey: '',
  password: ''
};

describe('env', () => {
  it('web3Url', () => {
    expect(env.web3Url).not.toBe('');
  });
  it('privateKey', () => {
    expect(env.privateKey).not.toBe('');
  });
});

module.exports = env;
