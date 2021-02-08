const MetaCoin = artifacts.require("MetaCoin");

// Contract -> Clean Room
contract('MetaCoin', (accounts) => {

// Describe -> No Clean Room
/*
describe('MetaCoin', function () {
  let accounts;

  before("Get accounts", async function () {
    accounts = await web3.eth.getAccounts()
    console.log(`\tAccounts`, accounts);
  })
*/

  // Console Log Test
  var soMany = 1000;
  console.log(`\tThis is ${soMany} times easier!`);

  it('Should put 10000 MetaCoin in the first account', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    const balance = await metaCoinInstance.getBalance.call(accounts[0]);
    console.log(`\tAccount[0] balance: `, balance.toNumber());

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it('Should call a function that depends on a linked library', async () => {
    const metaCoinInstance = await MetaCoin.deployed();
    const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
    const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();
    console.log(`\tAccount[0] balance: `, metaCoinBalance);

    assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });

  it('Should send coin correctly', async () => {
    const metaCoinInstance = await MetaCoin.deployed();

    // Setup 2 accounts
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account
    const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();
    console.log(`\tAccount[0] balance: `, accountOneStartingBalance);
    console.log(`\tAccount[1] balance: `, accountTwoStartingBalance);

    // Make transaction from first account to second
    const amount = 10;
    await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions
    const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();
    console.log(`\tAccount[0] balance: `, accountOneEndingBalance);
    console.log(`\tAccount[1] balance: `, accountTwoEndingBalance);

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
