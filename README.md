# Bitera Faucet
Send DAIs from the Ropsten Ethereum Network to your wallet


## Demo
Live version can be found [here](https://bitera-faucet.vercel.app/)

![alt text](https://github.com/mattiascaricato/bitera-faucet/blob/master/src/assets/app.PNG?raw=true "Bitera Faucet Preview")

## Development
### Web App
- Start development server ```npm run dev```
- Make production build ```npm run build```
- Linter ```npm run lint```

### EVM
- EVM ```npx buidler node```
- Deploying SC to localhost EVM (local Ethereum network) node ```npx buidler run scripts/dai-deploy.js --network localhost```
- Deploying SC to ropsten ```npx buidler run scripts/dai-deploy.js --network ropsten```
- Compile SC ```npx buidler compile```
- Test SC ```npx buidler test```
- Buidler built-in JavaScript console ```$ npx buidler console```

## Features backlog
- [x] Add error handling
- [x] Replace Web3 with Ethers
- [x] Add notifications
- [x] Add connect/disconnect
- [x] Persist account in localStorage
- [] Improve notifications styles
- [] Add WalletConnect integration
