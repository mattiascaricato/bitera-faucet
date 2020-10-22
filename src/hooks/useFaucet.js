import { useContext } from 'preact/hooks';
import { FaucetContext } from '../contexts/FaucetContext';

const useFaucet = () => {
  const { sendDAI } = useContext(FaucetContext);

  return {
    sendDAI,
  };
};

export default useFaucet;
