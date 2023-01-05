import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartDropDownContext } from '../contexts/cart.context';
const CheckoutItem = ({ cartItem }) => {
  console.log('CheckoutItem', cartItem);
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, removeOneProduct } =
    useContext(CartDropDownContext);

  const increaseQuantity = () => {
    addItemToCart(cartItem);
  };

  const decreaseQuantity = () => {
    removeItemFromCart(cartItem);
  };

  const removeProductFromCart = () => {
    removeOneProduct(cartItem);
  };

  return (
    <div className='checkout-cart-item-container'>
      <div className='checkout-cart-image-container'>
        <img src={imageUrl} alt={name} className='checkout-item-image' />
      </div>
      <div className='checkout-item-name'>{name}</div>
      <div className='cart-item-quantity-modifier'>
        <div className='cart-item-arrow' onClick={decreaseQuantity}>
          &#10094;
        </div>
        <span className='checkout-item-quantity'>{quantity}</span>
        <div className='cart-item-arrow' onClick={increaseQuantity}>
          &#10095;
        </div>
      </div>

      <div className='checkout-item-price'>{price}</div>
      <div className='cart-item-remove-button' onClick={removeProductFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
