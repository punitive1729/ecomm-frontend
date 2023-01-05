import { createContext, useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) => {
    if (cartItem.id === cartItemToRemove.id) {
      if (cartItem.quantity > 1) cartItem.quantity = cartItem.quantity - 1;
      else return false;
    }
    return true;
  });
};

const removeProduct = (cartItems, cartItemToRemove, price) => {
  return cartItems.filter((cartItem) => {
    if (cartItem.id === cartItemToRemove.id) {
      price.totalPrice = price.totalPrice - cartItem.quantity * cartItem.price;
      return false;
    }
    return true;
  });
};

export const CartDropDownContext = createContext({
  cartStatus: false,
  cartItems: [],
  totalCartItems: 0,
  totalPrice: 0,
  setTotalPrice: () => {},
  removeItemFromCart: () => {},
  removeOneProduct: () => {},
  setTotalCartItems: () => {},
  addItemToCart: () => {},
  setCartStatus: () => {},
});

// CART ACTIONS
const cartActions = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_STATUS: 'SET_CART_STATUS',
};

// CART INITIALIZER
const cartInitializer = {
  cartStatus: false,
  cartItems: [],
  totalCartItems: 0,
  totalPrice: 0,
};

// CART REDUCER
const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case cartActions.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case cartActions.SET_CART_STATUS:
      return {
        ...state,
        cartStatus: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartDropDownContextProvider = ({ children }) => {
  /***********************************
   *
   * CONTEXT-API USING useState, useEffect
   *
   *
   * const [cartStatus, setCartStatus] = useState(false);
   * const [cartItems, setCartItems] = useState([]);
   * const [totalCartItems, setTotalCartItems] = useState(0);
   * const [totalPrice, setTotalPrice] = useState(0);
   * const price = { totalPrice };
   *
   * const removeOneProduct = (cartItem) => {
   *   setCartItems(removeProduct(cartItems, cartItem, price));
   *   setTotalPrice(price.totalPrice);
   *   setTotalCartItems(totalCartItems - cartItem.quantity);
   * };
   *
   * const removeItemFromCart = (cartItemToRemove) => {
   *   setCartItems(removeCartItem(cartItems, cartItemToRemove));
   *   setTotalPrice(totalPrice - cartItemToRemove.price);
   *   setTotalCartItems(totalCartItems - 1);
   * };
   *
   * const addItemToCart = (productToAdd) => {
   *   setCartItems(addCartItem(cartItems, productToAdd, price));
   *   setTotalPrice(totalPrice + productToAdd.price);
   *   setTotalCartItems(totalCartItems + 1);
   * };
   *
   ************************************/

  const [state, dispatch] = useReducer(cartReducer, cartInitializer);
  const { cartItems, cartStatus, totalPrice, totalCartItems } = state;
  const price = { totalPrice };
  const updateCartDispatcher = (
    newCartItems,
    newTotalPrice,
    newTotalCartItems
  ) => {
    dispatch({
      type: cartActions.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        totalCartItems: newTotalCartItems,
        totalPrice: newTotalPrice,
      },
    });
  };

  const setCartStatus = () => {
    dispatch({
      type: cartActions.SET_CART_STATUS,
      payload: !cartStatus,
    });
  };

  const removeOneProduct = (cartItem) => {
    const newCartItems = removeProduct(cartItems, cartItem, price);
    updateCartDispatcher(
      newCartItems,
      price.totalPrice,
      totalCartItems - cartItem.quantity
    );
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartDispatcher(
      newCartItems,
      totalPrice - cartItemToRemove.price,
      totalCartItems - 1
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd, price);
    updateCartDispatcher(
      newCartItems,
      totalPrice + productToAdd.price,
      totalCartItems + 1
    );
  };

  const value = {
    cartStatus,
    removeOneProduct,
    setCartStatus,
    cartItems,
    addItemToCart,
    totalCartItems,
    removeItemFromCart,
    totalPrice,
  };

  return (
    <CartDropDownContext.Provider value={value}>
      {children}
    </CartDropDownContext.Provider>
  );
};
