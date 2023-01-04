import './cart.styles.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './../../components/button.component';
import CartItem from '../../components/cart-item.component';
import { CartDropDownContext } from '../../contexts/cart.context';
const CartDropDown = () => {
  const { cartItems, setCartStatus } = useContext(CartDropDownContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    setCartStatus(false);
    navigate('/checkout');
  };

  return (
    <div className='cart-drop-down-container'>
      <div className='cart-items-list'>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} product={cartItem} />;
        })}
      </div>
      <Button text='CHECKOUT' onClick={goToCheckout} />
    </div>
  );
};
export default CartDropDown;
