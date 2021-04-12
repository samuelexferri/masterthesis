const Fixed1 = artifacts.require("Fixed1");

contract('Fixed1', (accounts) => {

  it('Should do something', async () => {
    const fixed1Instance = await Fixed1.deployed();

	await fixed1Instance.fixed12({ from: accounts[0] });
	
	assert.equal(1, 1, "Error");
  }); 
  
  it('Should do something', async () => {
    const fixed1Instance = await Fixed1.deployed();

	await fixed1Instance.simple({ from: accounts[0] });
	
	assert.equal(1, 1, "Error");
  }); 
  
});
