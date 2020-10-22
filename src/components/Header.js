import React from 'preact';

import useAccount from '../hooks/useAccount';
import useNotification from '../hooks/useNotification';

const AccountHeader = ({ address, onClick }) => {
  const getShortAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4, addr.length)}`;

  return (
    address
      ? <button className="secondary-cta" type="button" onClick={onClick}>{getShortAddress(address)}</button>
      : (
        <button className="secondary-cta" type="button" onClick={onClick}>
          Conectá tu Wallet
          <span />
        </button>
      )
  );
};

const Header = () => {
  const { notifyError, removeError } = useNotification();
  const {
    address, connect, disconnect, connected,
  } = useAccount();

  const handleAccountOnClick = async () => {
    try {
      if (connected()) {
        disconnect();
        return;
      }

      await connect();
      removeError();
    } catch (error) {
      if (error.message === 'WRONG_NETWORK') {
        notifyError('Por favor, conectá tu MetaMask a la red Ropsten');
      } else if (error.message === 'CONNECT_REJECTED') {
        notifyError('Por favor, conectá MetaMask');
      }
    }
  };

  return (
    <>
      <header className="header">
        <AccountHeader address={address} onClick={handleAccountOnClick} />
      </header>
    </>
  );
};

export default Header;
