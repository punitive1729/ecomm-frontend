import './cart-item.styles.scss';
const CartItem = ({ product }) => {
  const { name, price, imageUrl, quantity } = product;
  console.log(product);
  return (
    <div className='cart-list-item-container'>
      <img src={imageUrl} alt={name} className='cart-item-image' />
      <div className='cart-item-details'>
        <div className='cart-item-name'>{name}</div>
        <div className='cart-item-price'>{`${quantity} X ${price}`}</div>
      </div>
    </div>
  );
};
export default CartItem;
