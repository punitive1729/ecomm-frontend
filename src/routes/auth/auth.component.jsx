import SignUp from '../../components/sign-up-form.component';
import SignIn from '../../components/sign-in-form.component';
import './auth.styles.scss';
const Auth = () => {
  return (
    <div className='sign-in-page'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Auth;
