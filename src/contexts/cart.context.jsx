import { createContext, useState } from 'react';

const updateCartItems = (cartItems, productToAdd) => {
  let flag = 0;
  console.log('adding Product: ', productToAdd);
  const newCartItems = cartItems.map((cartItem) => {
    if (cartItem.id === productToAdd.id) {
      flag = 1;
      cartItem.quantity = cartItem.quantity + 1;
    }
    return cartItem;
  });

  if (flag) return newCartItems;
  newCartItems.push({ ...productToAdd, quantity: 1 });
  return newCartItems;
};

export const CartDropDownContext = createContext({
  cartStatus: false,
  cartItems: [],
  totalCartItems: 0,
  setTotalCartItems: () => {},
  addItemToCart: () => {},
  setCartStatus: () => {},
});

export const CartDropDownContextProvider = ({ children }) => {
  const [cartStatus, setCartStatus] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(updateCartItems(cartItems, productToAdd));
  };

  const value = {
    cartStatus,
    setCartStatus,
    cartItems,
    addItemToCart,
    totalCartItems,
    setTotalCartItems,
  };

  return (
    <CartDropDownContext.Provider value={value}>
      {children}
    </CartDropDownContext.Provider>
  );
};
