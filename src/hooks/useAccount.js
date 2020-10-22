import { useContext } from 'preact/hooks';
import { AccountContext } from '../contexts/AccountContext';

const useAccount = () => {
  const {
    address, connect, disconnect, connected,
  } = useContext(AccountContext);

  return {
    address,
    connect,
    disconnect,
    connected,
  };
};

export default useAccount;
