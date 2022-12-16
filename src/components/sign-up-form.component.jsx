import {
  createUserFromEmailAndPasswordAuth,
  createUserDocumentFromAuth,
} from './../utils/firebase/firebase.utils';
import FormInput from './form-input.component';
import { useState, useContext } from 'react';
import './sign-up-form.styles.scss';
import Button from './button.component';
import { UserContext } from '../contexts/user.contex';
const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return;
    try {
      const { user } = await createUserFromEmailAndPasswordAuth(
        email,
        password
      );
      await createUserDocumentFromAuth({
        ...user,
        displayName,
      });
      setCurrentUser(user);
    } catch (error) {
      console.log('Error in creating user..', error);
      alert('Error signing Up');
      throw error;
    }
    setFormFields(defaultFormField);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className='sign-up-form-container'>
      <h2>Dont Have account?</h2>
      <span>Sign Up</span>
      <form onSubmit={handleSignUp} className='sign-up-form'>
        <FormInput
          labelName='Display Name'
          type='text'
          required
          value={displayName}
          onChange={handleChange}
          name='displayName'
        />
        <FormInput
          labelName='Email'
          required
          type='email'
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
        <FormInput
          labelName='Confirm Password'
          required
          type='password'
          value={confirmPassword}
          onChange={handleChange}
          name='confirmPassword'
        />
        <Button text='SIGN UP' type='submit' />
      </form>
    </div>
  );
};

export default SignUp;
