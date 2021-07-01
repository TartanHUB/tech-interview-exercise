import { useState, useEffect } from 'react';

const useSessionStorage = (sessionKey: string) => {
  const getSessionStorageVal = () => {
    try {
      const storageValue = sessionStorage.getItem(sessionKey);
      if (storageValue != null) {
        // There is a session in the storage already
        try {
          const session = JSON.parse(storageValue);
          return session;
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const [state, setState] = useState(getSessionStorageVal);

  const saveSessionStorage = (sessionValue: { username: string; isLoggedIn: boolean }) => {
    sessionStorage.setItem(sessionKey, JSON.stringify(sessionValue));
    setState(sessionValue);
  };

  const clear = () => {
    sessionStorage.removeItem(sessionKey);
    setState(null);
  };

  const syncState = (event: StorageEvent) => {
    if (event.key === sessionKey) {
      setState(getSessionStorageVal());
    }
  };

  useEffect(() => {
    window.addEventListener('storage', syncState);
    return () => {
      window.removeEventListener('storage', syncState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  return { session: state, saveSessionStorage, clear };
};

export default useSessionStorage;
