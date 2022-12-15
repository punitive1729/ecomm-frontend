import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from './../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';
import { useState } from 'react';
import FormInput from './form-input.component';
const defaultSignInForm = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultSignInForm);
  const { password, email } = formFields;

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log('Result\n', await createUserDocumentFromAuth(user));
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
      <h1 className='sign-in-form-title'>SIGN IN</h1>
      <form onSubmit={() => {}} className='sign-in-form'>
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
          type='password'
          required
          value={password}
          onChange={handleChange}
          name='password'
        />
        <button className='sign-in-button' type='submit'>
          SIGN IN
        </button>
      </form>
      <button onClick={logGoogleUser} className='google-sign-in'>
        GOOGLE SIGN IN
      </button>
    </div>
  );
};

export default SignIn;
