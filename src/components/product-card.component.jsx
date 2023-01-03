import './product-card.styles.scss';
import Button from './button.component';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} className='product-image' />
      <div className='product-footer'>
        <span className='product-name'>{name.toUpperCase()}</span>
        <span className='product-price'>{price}</span>
      </div>
      <div className='product-button'>
        <Button text='Add to Cart' buttonType='inverted' />
      </div>
    </div>
  );
};

export default ProductCard;
