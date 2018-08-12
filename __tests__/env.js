let env = {
  web3Url: 'https://rinkeby.infura.io',
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
