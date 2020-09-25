// We require the Buidler Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
const bre = require("@nomiclabs/buidler");
const ethers = bre.ethers;

async function main() {
  // Buidler always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await bre.run('compile');

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", await deployer.getAddress());
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const DaiContractFactory = await ethers.getContractFactory("Dai");
  const chainId = await bre.web3.eth.getChainId();
  const DaiContract = await DaiContractFactory.deploy(chainId);

  await DaiContract.deployed();

  console.log("Dai deployed to:", DaiContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
