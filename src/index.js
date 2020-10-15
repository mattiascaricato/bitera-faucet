import { useState, useEffect, useRef } from 'preact/hooks';
import { forwardRef } from "preact/compat";
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
  ></input>
));

const SubmitButton = () => (
  <button class="primary-cta" type="submit"><span class="send-icon"></span>Enviar DAI</button>
);

const Disclaimer = () => (
  <p class="disclaimer">* DAI de la red de Ethereum Ropsten, <strong>NO es DAI real</strong></p>
);

const FaucetForm = ({ value, onChange, onSubmit, inputRef }) => (
  <form onSubmit={onSubmit}>
    <Title />
    <AddressInput value={value} onChange={onChange} ref={inputRef} />
    <SubmitButton />
    <Disclaimer />
  </form>
);

const Logo = () => (
  <a href="https://bitera.app/" target="_blank" class="logo" rel="noreferrer">Bitera logo</a>
);

const Copyright = () => (
  <p>2020 © Bitera - Todos los derechos reservados - <a href="https://bitera.app/privacy-policy.html" target="_blank" rel="noreferrer">Política de Privacidad</a></p>
);

const AccountHeader = (props) => {
  const { account: { address }, onClick } = props;

  const getShortAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;

  return (
    address
      ? <button class="secondary-cta" onClick={onClick}>{getShortAddress(address)}</button>
      : <button class="secondary-cta" onClick={onClick}>Conectá tu Wallet <span></span></button>
  );
};

export default () => {
  const [account, setAccount] = useState({ address: '' });
  const [toAddress, setToAddress] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAccountOnClick = () => {
    account.address
      ? setAccount(prevState => ({ ...prevState, address: '' }))
      : setAccount(prevState => ({ ...prevState, address: '0x8b2db6397De65D4C03429BC2e7f09515f98AC214' }));
  }

  const handleAdressChange = (e) => {
    setToAddress(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submited - Address: ${toAddress}`);
  }

  return (
  <div class="container">
    <header class="header">
      <AccountHeader onClick={handleAccountOnClick} account={account} />
    </header>
    <div class="logo">
      <Logo />
    </div>
    <section class="content">
      <FaucetForm
        value={toAddress}
        onChange={handleAdressChange}
        onSubmit={handleFormSubmit}
        inputRef={inputRef}
      />
    </section>
    <footer class="footer">
      <Copyright />
    </footer>
  </div>
  )
}
