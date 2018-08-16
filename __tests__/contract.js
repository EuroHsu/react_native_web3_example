let contract = {
  address: '',
  abi: [],
  bytecode: ''
};
  
describe('contract', () => {
  it('address', () => {
    expect(contract.address).not.toBe('');
  });
  it('bytecode', () => {
    expect(contract.bytecode).not.toBe('');
  });
  it('abi', () => {
    expect(contract.abi).not.toBe([]);
  });
});
  
module.exports = contract;
  