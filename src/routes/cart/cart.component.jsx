import './cart.styles.scss';
import Button from './../../components/button.component';
const CartDropDown = () => {
  return (
    <div className='cart-drop-down-container'>
      <div className='cart-items-list'></div>
      <Button text='CHECKOUT' />
    </div>
  );
};
export default CartDropDown;
