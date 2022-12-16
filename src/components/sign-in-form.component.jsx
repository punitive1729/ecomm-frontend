import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from './../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';
import { useState, useContext } from 'react';
import FormInput from './form-input.component';
import Button from './button.component';
import { UserContext } from '../contexts/user.contex';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, email } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    setCurrentUser(user);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
    } catch (error) {
      console.log('Error in signing-in user..', error);
      alert('Error Logging In');
      throw error;
    }
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className='sign-in-form-container'>
      <h2 className='sign-in-form-title'>Already Have Account?</h2>
      <span>Sign In</span>
      <form onSubmit={handleSignIn} className='sign-in-form'>
        <FormInput
          labelName='Email'
          type='email'
          required
          value={email}
          onChange={handleChange}
          name='email'
        />
        <FormInput
          labelName='Password'
          required
          type='password'
          value={password}
          onChange={handleChange}
          name='password'
        />
        <div className='signIn-buttons'>
          <Button text='SIGN IN' type='submit' />
          <Button
            type='button'
            text='GOOGLE'
            onClick={logGoogleUser}
            buttonType='google'
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
