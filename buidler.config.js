usePlugin('@nomiclabs/buidler-waffle');
usePlugin('@nomiclabs/buidler-web3');

const { INFURA_PROJECT_ID } = process.env;
const { ROPSTEN_PRIVATE_KEY } = process.env;

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task('accounts', 'Prints the list of accounts')
  .setAction(async () => {
    const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

task('balance', "Prints an account's balance")
  .addParam('account', "The account's address")
  .setAction(async (taskArgs) => {
    const address = taskArgs.account;

    if (!web3.utils.isAddress(address)) {
      throw new Error('Invalid ETH address');
    }

    const account = web3.utils.toChecksumAddress(address);
    const balance = await web3.eth.getBalance(account);

    console.log(`${web3.utils.fromWei(balance, 'ether')} ETH`);
  });

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: '0.6.8',
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
