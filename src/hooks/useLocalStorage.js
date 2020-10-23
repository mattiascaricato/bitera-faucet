import { useState } from 'preact/hooks';

const useLocalStorage = (key, initialValue) => {
  const [localStorageItem, setLocalStorageItem] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });

  const setItem = (item) => {
    try {
      setLocalStorageItem(item);
      localStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return [
    localStorageItem,
    setItem,
  ];
};

export default useLocalStorage;
