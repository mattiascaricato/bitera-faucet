if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
 } else {
 // set the provider you want from Web3.providers
 web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
}

const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const contract = new web3.eth.Contract(abi, '0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F');

contract.methods.greet().call().then(console.log);
