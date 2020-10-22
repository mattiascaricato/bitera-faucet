import React from 'preact';
import { forwardRef } from 'preact/compat';

const Title = () => (
  <h1>Bitera Faucet</h1>
);

const AddressInput = forwardRef(({ value, onChange }, ref) => (
  <input
    className="flexible-input"
    type="text"
    value={value}
    onChange={onChange}
    placeholder="Ingresa la dirección de tu Bitera"
    ref={ref}
    required
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
    {' '}
    <strong>NO es DAI real</strong>
  </p>
);

const Form = ({
  value, onChange, onSubmit, inputRef,
}) => (
  <>
    <Title />
    <form onSubmit={onSubmit}>
      <AddressInput value={value} onChange={onChange} ref={inputRef} />
      <SubmitButton />
      <Disclaimer />
    </form>
  </>
);

export default Form;
