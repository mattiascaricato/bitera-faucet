import React, { createContext } from 'preact';
import { useState } from 'preact/hooks';
import { ethers } from 'ethers';

export const AccountContext = createContext();
export const ProviderContext = createContext();

const AccountContextProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const { ethereum } = window;

  const validNetwork = () => {
    const { chainId } = ethereum;
    const ROPSTEN_CHAIN_ID = '0x3';

    return (chainId === ROPSTEN_CHAIN_ID);
  };

  const connect = async () => {
    if (!validNetwork()) throw new Error('WRONG_NETWORK');

    try {
      const [walletAddress] = await ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(walletAddress);
      setProvider(new ethers.providers.Web3Provider(ethereum));
    } catch (error) {
      // The request was rejected by the user
      if (error.code === 4001) {
        throw new Error('CONNECT_REJECTED');
      }
    }
  };

  const connected = () => (Boolean(address));

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
  };

  const accountContextValue = {
    address,
    connect,
    disconnect,
    connected,
  };

  const providerContextValue = {
    provider,
  };

  return (
    <AccountContext.Provider value={accountContextValue}>
      <ProviderContext.Provider value={providerContextValue}>
        { children }
      </ProviderContext.Provider>
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
