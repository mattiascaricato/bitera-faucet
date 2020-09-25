# Bitera Faucet

![alt text](https://github.com/mattiascaricato/bitera-faucet/blob/master/app/assets/app.PNG?raw=true)

## Next features
- Add the smart contract for minting DAI into the project to interact locally hitting Buidler EVM
- Add preact + static site generator (Netlify and gatsby)
- Add error handling
- Add toast notifications for feedback (TX in progress and finished)

## Development

- Web server ```npm start```
- EVM ```npx buidler node```
- Deploying SC to localhost EVM (local Ethereum network) node ```npx buidler run scripts/dai-deploy.js --network localhost```
- Deploying SC to ropsten ```npx buidler run scripts/dai-deploy.js --network ropsten```
- Compile SC ```npx buidler compile```
- Test SC ```npx buidler test```
- Buidler built-in JavaScript console ```$ npx buidler console```
