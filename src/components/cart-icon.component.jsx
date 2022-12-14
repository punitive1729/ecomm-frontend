import './cart-icon.styles.scss';
import { CartDropDownContext } from '../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from './../assets/shopping-bag.svg';
import { useContext } from 'react';
const CartIcon = () => {
  const { setCartStatus, cartStatus, totalCartItems } =
    useContext(CartDropDownContext);
  const getCartDetails = () => {
    console.log('CartStatus\n', cartStatus);
    setCartStatus(!cartStatus);
  };
  return (
    <div className='cart-icon-container' onClick={getCartDetails}>
      <ShoppingIcon className='shopping-icon' />
      <span className='cart-count'>{totalCartItems}</span>
    </div>
  );
};

export default CartIcon;
