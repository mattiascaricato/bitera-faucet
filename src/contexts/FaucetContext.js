import { ethers } from 'ethers';
import React, { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import useAccount from '../hooks/useAccount';
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
  const { disconnect } = useAccount();
  const [daiContract, setDaiContract] = useState(null);

  // MetaMask recommends reloading the page when the currently connected account or network changes
  useEffect(() => {
    const { ethereum } = window;

    ethereum.on('chainChanged', () => {
      disconnect();
    });

    ethereum.on('accountsChanged', () => {
      disconnect();
    });

    // Cleanup events listeners when component unmount
    return () => {
      ethereum.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (!provider) {
      setDaiContract(null);
      return;
    }

    const contract = new ethers.Contract(daiAddress, daiABI, provider);
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    setDaiContract(contractWithSigner);
  }, [provider]);

  const sendDAI = (recipientAddress) => {
    if (!provider || !daiContract) throw new Error('CONNECT_REJECTED');

    return daiContract.mint(recipientAddress, parseDai('1337'));
  };

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
