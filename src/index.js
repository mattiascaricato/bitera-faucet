import React from 'preact';
import 'react-toastify/dist/ReactToastify.css';
import NotificationContextPorivder from './contexts/NotificationContext';
import AccountContextProvider from './contexts/AccountContext';
import FaucetContextProvider from './contexts/FaucetContext';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './style.css';

const App = () => (
  <NotificationContextPorivder>
    <AccountContextProvider>
      <div className="container">
        <Header />
        <FaucetContextProvider>
          <Content />
        </FaucetContextProvider>
        <Footer />
      </div>
    </AccountContextProvider>
  </NotificationContextPorivder>
);

export default App;
