
import { useState, useEffect } from 'react';

export default function useUser(loginUser) {
  const [useUserLogin, setUseUserLogin] = useState('');

  useEffect(() => {
    if (loginUser) {
      setUseUserLogin(localStorage.getItem('login'));
    } else {
      setUseUserLogin(null);
    }
  }, [loginUser]);

  return useUserLogin;
}
