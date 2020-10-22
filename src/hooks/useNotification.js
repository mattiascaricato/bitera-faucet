import { useContext } from 'preact/hooks';
import { NotificationContext } from '../contexts/NotificationContext';

const useNotification = () => {
  const {
    notify, notifyError, error, removeError,
  } = useContext(NotificationContext);

  return {
    notify,
    notifyError,
    error: error(),
    removeError,
  };
};

export default useNotification;
