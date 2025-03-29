import React, { useState } from 'react';
import LoginForm from '../features/auth/components/LoginForm';
import ResetPasswordForm from '../features/auth/components/ResetPasswordForm';
import Button from '../components/common/Button';
import {setHasFetchedCart} from '../features/cart/cartSlice';
import {useDispatch} from 'react-redux';

const LoginPage = () => {
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false) 
  const dispatch = useDispatch(); 

  const handleLoginSuccess = (user) => {
    console.log('User logged in successfully:', user);
    if (localStorage.getItem("guestCart")) {
      localStorage.removeItem("guestCart");
    }
    dispatch(setHasFetchedCart(false)); 
  };


  const handleResetPasswordSuccess = (email) => {
    console.log('Password reset succhessfully for ', email);
  };
  return (
    <div>
      {isPasswordForgotten ? (
        <ResetPasswordForm 
          onResetPasswordSuccess={handleResetPasswordSuccess}
          footer={<Button onClick={() => setIsPasswordForgotten(false)}>Back to Login</Button>}
        />
      ) : (
        <LoginForm 
          onLoginSuccess={handleLoginSuccess}
          footer={<Button onClick={() => setIsPasswordForgotten(true)}>Forgot Password?</Button>}
        />
      )}
    </div>
  );
};

export default LoginPage;

