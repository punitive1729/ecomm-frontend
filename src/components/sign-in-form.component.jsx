import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from './../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';
import { useState } from 'react';
import FormInput from './form-input.component';
import Button from './button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, email } = formFields;

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user);
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
