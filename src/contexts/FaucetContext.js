import { ethers } from 'ethers';
import React, { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ProviderContext } from './AccountContext';

export const FaucetContext = createContext();

const daiAddress = '0xFCE4e7ca35CF1Bd56648FC0DBe9285d21C2fA859';
const daiABI = [
  // Some details about the token
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  // Get the account balance
  'function balanceOf(address) view returns (uint)',
  // Mint DAIs
  'function mint(address, uint)',
];

const parseDai = (amount) => ethers.utils.parseUnits(amount, 18);

const FaucetContextProvider = ({ children }) => {
  const { provider } = useContext(ProviderContext);
  const [daiContract, setDaiContract] = useState(null);

  useEffect(() => {
    console.log(provider);
    console.log(daiContract);
    if (!provider) return;
    console.log('new provider');

    const contract = new ethers.Contract(daiAddress, daiABI, provider);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    setDaiContract(contractWithSigner);
  }, [provider]);

  const sendDAI = (recipientAddress) => daiContract.mint(recipientAddress, parseDai('1337'));

  const faucetContextValue = {
    sendDAI,
  };

  return (
    <FaucetContext.Provider value={faucetContextValue}>
      { children }
    </FaucetContext.Provider>
  );
};

export default FaucetContextProvider;
