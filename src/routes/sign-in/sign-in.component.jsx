import SignUp from '../../components/sign-up-form.component';
import SignIn from '../../components/sign-in-form.component';
import './sign-in.styles.scss';
const SignInPage = () => {
  return (
    <div className='sign-in-page'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInPage;
