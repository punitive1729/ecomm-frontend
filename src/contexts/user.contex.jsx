import { createContext, useEffect, useState } from 'react';
import { authStateChangeListener } from './../utils/firebase/firebase.utils';
// actual context which holds some default value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// provider-component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    // We want authListener only when UserContext is mounted else not needed
    authStateChangeListener((user) => {
      console.log('context-user\n', user);
      setCurrentUser(user);
    });
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
