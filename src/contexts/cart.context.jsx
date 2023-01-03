import { createContext, useState } from 'react';

export const CartDropDownContext = createContext({
  cartStatus: false,
  setCartStatus: () => {},
});

export const CartDropDownContextProvider = ({ children }) => {
  const [cartStatus, setCartStatus] = useState(false);
  const value = { cartStatus, setCartStatus };
  return (
    <CartDropDownContext.Provider value={value}>
      {children}
    </CartDropDownContext.Provider>
  );
};
