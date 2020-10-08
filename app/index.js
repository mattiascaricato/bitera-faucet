let web3;
let networkType = '';
const ROPSTEN_NETWORK = 'ropsten';

const connect = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    networkType = await web3.eth.net.getNetworkType();
    const [address] = await web3.eth.getAccounts();

    return {
      address
    };
  } else {
    window.alert('Necesitás tener MetaMask para poder usar esta app (https://metamask.io/)');
  }
}

// Edgecase: if mint is called before connect, web3 might be undefined;
const mint = async (addressTo, amount, contract) => {
  const accounts = await web3.eth.getAccounts();
  const fromAddress = accounts[0];

  contract.methods.mint(addressTo, amount).send({ from: fromAddress }).then((a) => console.log('TX completed'));
}

const connectButton = document.querySelector('.secondary-button');

window.addEventListener('load', async () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  const account = await connect();

  if (networkType !== ROPSTEN_NETWORK) window.alert(`Estás conectado a la red ${networkType}. Por favor conectate a ${ROPSTEN_NETWORK}`)

  // Display account address
  if (account.address) {
    address = `${account.address.substring(0,6)}...${account.address.substring(account.address.length-4,account.address.length)}`;
    connectButton.childNodes[0].nodeValue = address;
    connectButton.childNodes[1].classList.add('dot');

    console.log(`Account connected: ${account.address}`);
  }
 });

connectButton.addEventListener('click', async (e) => {
  // ToDo: add disconect

  try {
    // Request account access
    await window.ethereum.enable();
    console.log('Account connected');
  } catch (error) {
    console.error(error);
  }
});


document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Smart Contract for minting DAI
  const contractAdress = '0xFCE4e7ca35CF1Bd56648FC0DBe9285d21C2fA859';
  const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"usr","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nonces","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"holder","type":"address"},{"name":"spender","type":"address"},{"name":"nonce","type":"uint256"},{"name":"expiry","type":"uint256"},{"name":"allowed","type":"bool"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"usr","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"usr","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"usr","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"chainId_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}]
  const contract = new web3.eth.Contract(abi, contractAdress);
  const address = document.querySelector('.flexible-input').value;
  const amountOfDAI = web3.utils.toWei('1337');

  if (!web3.utils.isAddress(address)) {
    window.alert('Dirección de Wallet invalida');
    return;
  }

  mint(address, amountOfDAI, contract);
});
