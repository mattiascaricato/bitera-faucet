import React, { createContext } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { toast } from 'react-toastify';

export const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
  const [notification, setMessage] = useState(null);

  const notify = (message) => { setMessage({ message, type: 'info' }); toast(message); };
  const notifyError = (message) => { setMessage({ message, type: 'error' }); toast.error(message); };
  const removeError = () => setMessage(null);
  const error = () => (Boolean(notification) && notification.type === 'error');

  useEffect(() => {
    // Configure react-toastify
    toast.configure({
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  const contextValue = {
    // TODO: useMemo
    notify,
    notifyError,
    removeError,
    error,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      { children }
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
