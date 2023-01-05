import './product-card.styles.scss';
import Button from './button.component';
import { useContext } from 'react';
import { CartDropDownContext } from '../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartDropDownContext);
  const { name, price, imageUrl } = product;
  const addToCartList = () => {
    addItemToCart(product);
  };
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} className='product-image' />
      <div className='product-footer'>
        <span className='product-name'>{name.toUpperCase()}</span>
        <span className='product-price'>{price}</span>
      </div>
      <div className='product-button' onClick={addToCartList}>
        <Button text='Add to Cart' buttonType='inverted' />
      </div>
    </div>
  );
};

export default ProductCard;
