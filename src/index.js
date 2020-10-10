import './style.css';

const Title = () => (
  <h1>Bitera Faucet</h1>
);

const AddressInput = () => (
  <input type="text" placeholder="Ingresa la dirección de tu testnet wallet de Bitera"></input>
);

const SubmitButton = () => (
  <button type="submit">Enviar DAI</button>
);

const Disclaimer = () => (
  <p>* DAI de la red de Ethereum Ropsten, <strong>NO es DAI real</strong></p>
);

const FaucetForm = () => (
  <form>
    <Title />
    <AddressInput />
    <SubmitButton />
    <Disclaimer />
  </form>
);

const Logo = () => (
  <p>Bitera</p>
);

const Copyright = () => (
  <div>
    <p>2020 © Bitera - Todos los derechos reservados - <a href="https://bitera.app/privacy-policy.html" target="_blank" rel="noreferrer">Política de Privacidad</a></p>
  </div>
);

const AccountHeader = (props) => {
  const { account: { address }} = props;

  const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;

  return (
    address
    ? <button>{shortAddress}</button>
    : <button>Conectá tu Wallet <span></span></button>
  );
};

export default () => (
  <div class="container">
    <div class="content">
      <AccountHeader account={ACCOUNT}/>
      <Logo />
      <FaucetForm />
      <Copyright />
    </div>
  </div>
);

const ACCOUNT = {
  address: '0x8b2db6397De65D4C03429BC2e7f09515f98AC214'
};
