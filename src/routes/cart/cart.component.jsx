import './cart.styles.scss';
import { useContext } from 'react';
import Button from './../../components/button.component';
import CartItem from '../../components/cart-item.component';
import { CartDropDownContext } from '../../contexts/cart.context';
const CartDropDown = () => {
  const { cartItems } = useContext(CartDropDownContext);
  return (
    <div className='cart-drop-down-container'>
      <div className='cart-items-list'>
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} product={cartItem} />;
        })}
      </div>
      <Button text='CHECKOUT' />
    </div>
  );
};
export default CartDropDown;
