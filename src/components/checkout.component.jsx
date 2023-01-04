import './checkout.styles.scss';
import { useContext } from 'react';
import { CartDropDownContext } from '../contexts/cart.context';
import CheckoutItem from './checkout-item.component';
const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartDropDownContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='checkout-header-titles'>PRODUCT</div>
        <div className='checkout-header-titles'>DESCRIPTION</div>
        <div className='checkout-header-titles'>QUANTITY</div>
        <div className='checkout-header-titles'>PRICE</div>
        <div className='checkout-header-titles'>REMOVE</div>
      </div>

      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}

      {totalPrice > 0 && (
        <div className='checkout-total'>{`TOTAL: ${totalPrice}`}</div>
      )}
    </div>
  );
};

export default Checkout;
