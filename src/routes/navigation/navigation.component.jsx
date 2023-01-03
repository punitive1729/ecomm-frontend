import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';
import { ReactComponent as Logo } from './../../assets/crown.svg';
import { UserContext } from '../../contexts/user.contex';
import { signOutUser } from './../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon.component';
import CartDropDown from '../cart/cart.component';
import { CartDropDownContext } from '../../contexts/cart.context';
const Navigation = () => {
  const { cartStatus } = useContext(CartDropDownContext);
  const { currentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    console.log('signing out...');
    await signOutUser();
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <Logo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {cartStatus && <CartDropDown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
