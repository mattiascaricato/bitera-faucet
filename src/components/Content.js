import React from 'preact';
import { ethers } from 'ethers';
import { useState, useRef, useEffect } from 'preact/hooks';

import useFaucet from '../hooks/useFaucet';
import useNotification from '../hooks/useNotification';
import Form from './Form';

const Logo = () => (
  <a href="https://bitera.app/" target="_blank" className="logo" rel="noopener noreferrer">Bitera logo</a>
);

const Content = () => {
  const { sendDAI } = useFaucet();
  const [recipientAddress, setRecipientAddress] = useState(null);
  const { notify, notifyError } = useNotification();
  const inputRef = useRef(null);

  useEffect(() => {
    // Set focus on the input
    inputRef.current.focus();
  }, []);

  const handleAdressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!ethers.utils.isAddress(recipientAddress)) {
      notifyError('Por favor ingresá una dirección valida');
      return;
    }

    try {
      const tx = await sendDAI(recipientAddress);
      notify(() => (
        <a href={`https://ropsten.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
          Tus DAI están en camino...
        </a>
      ));

      await tx.wait();
      notify('DAI enviados con éxito!');
    } catch (error) {
      if (error.message === 'CONNECT_REJECTED') {
        notifyError('Por favor conectá MetaMask para continuar');
      }
    }
  };

  return (
    <>
      <div className="logo">
        <Logo />
      </div>
      <section className="content">
        <Form
          value={recipientAddress}
          onChange={handleAdressChange}
          onSubmit={handleFormSubmit}
          inputRef={inputRef}
        />
      </section>
    </>
  );
};

export default Content;
