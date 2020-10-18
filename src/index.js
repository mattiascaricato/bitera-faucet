import React from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { forwardRef } from 'preact/compat';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Title = () => (
  <h1>Bitera Faucet</h1>
);

const AddressInput = forwardRef(({ value, onChange }, ref) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Ingresa la dirección de tu testnet wallet de Bitera"
    ref={ref}
  />
));

const SubmitButton = () => (
  <button className="primary-cta" type="submit">
    <span className="send-icon" />
    Enviar DAI
  </button>
);

const Disclaimer = () => (
  <p className="disclaimer">
    * DAI de la red de Ethereum Ropsten,
    <strong>NO es DAI real</strong>
  </p>
);

const FaucetForm = ({
  value, onChange, onSubmit, inputRef,
}) => (
  <form onSubmit={onSubmit}>
    <Title />
    <AddressInput value={value} onChange={onChange} ref={inputRef} />
    <SubmitButton />
    <Disclaimer />
  </form>
);

const Logo = () => (
  <a href="https://bitera.app/" target="_blank" className="logo" rel="noopener noreferrer">Bitera logo</a>
);

const Copyright = () => (
  <p>
    2020 © Bitera - Todos los derechos reservados -
    {' '}
    <a href="https://bitera.app/privacy-policy.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
  </p>
);

const AccountHeader = ({ account: { address }, onClick }) => {
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

const notify = (message) => toast(message);
const notifyError = (message) => toast.error(message);

export default () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState({ address: '' });
  const [toAddress, setToAddress] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    toast.configure({
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  const handleAccountOnClick = async () => {
    // Disconnect account
    if (account.address) {
      setAccount({ address: '' });
      setProvider({});
      return;
    }
    // Connect account
    try {
      // Request account access
      const { chainId } = window.ethereum;
      const ROPSTEN_CHAIN_ID = '0x3';

      if (chainId !== ROPSTEN_CHAIN_ID) {
        const error = new Error();
        error.code = 'WRONG_CHAIN';

        throw error;
      }

      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount({ address });
    } catch (error) {
      if (error.code === 'WRONG_CHAIN') {
        notifyError('Por favor conectá tu MetaMask a la red Ropsten para continuar');
        return;
      }

      if (error.code === 4001) {
        notifyError('Por favor conectá MetaMask para continuar');
        return;
      }

      console.error(error);
    }

    setProvider(new ethers.providers.Web3Provider(window.ethereum));
  };

  const handleAdressChange = (e) => {
    setToAddress(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!ethers.utils.isAddress(toAddress)) {
      notifyError('Por favor ingresá una dirección valida');
      return;
    }

    if (!provider) {
      notifyError('Por favor conectá MetaMask para continuar');
      return;
    }

    const signer = provider.getSigner();
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
    const daiContract = new ethers.Contract(daiAddress, daiABI, provider);
    const daiWithSigner = daiContract.connect(signer);

    const parseDai = (amount) => ethers.utils.parseUnits(amount, 18);

    const tx = await daiWithSigner.mint('0x03bd02bc9899c111458f809f2e00fd9c33112057', parseDai('1337'));
    notify(() => (
      <a href={`https://ropsten.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
        Tus DAI están en camino...
      </a>
    ));
    await tx.wait();
    notify('DAI enviados con éxito!');
  };

  return (
    <div className="container">
      <header className="header">
        <AccountHeader onClick={handleAccountOnClick} account={account} />
      </header>
      <div className="logo">
        <Logo />
      </div>
      <section className="content">
        <FaucetForm
          value={toAddress}
          onChange={handleAdressChange}
          onSubmit={handleFormSubmit}
          inputRef={inputRef}
        />
      </section>
      <footer className="footer">
        <Copyright />
      </footer>
    </div>
  );
};
