import React from 'preact';

const Copyright = () => (
  <p>
    2020 © Bitera - Todos los derechos reservados -
    {' '}
    <a href="https://bitera.app/privacy-policy.html" target="_blank" rel="noopener noreferrer">Política de Privacidad</a>
  </p>
);

const Footer = () => (
  <footer className="footer">
    <Copyright />
  </footer>
);

export default Footer;
