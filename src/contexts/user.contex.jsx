import { createContext, useEffect, useReducer } from 'react';
import { authStateChangeListener } from './../utils/firebase/firebase.utils';

// actual context which holds some default value
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

const USER_ACTIONS = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// REACT REDUCER
const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// INITIAL ARG FOR USER_REDUCER
const INITIAL_STATE = {
  currentUser: null,
};

// provider-component
export const UserProvider = ({ children }) => {
  /*
  * React Default State management using CONTEXT-API and useState, useEffect Hooks 
  *
  const [currentUser, setCurrentUser] = useState(null);
  */
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTIONS.SET_CURRENT_USER, payload: user });
  };
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
