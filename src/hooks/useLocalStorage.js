const useLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));

  const localData = localStorage.getItem(key);
  localData ? JSON.parse(localData) : [];
};

export default useLocalStorage;
