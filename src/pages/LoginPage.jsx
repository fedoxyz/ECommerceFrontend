import React, { useState } from 'react';
import LoginForm from '../features/auth/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../features/auth/components/ResetPasswordForm';
import Button from '../components/common/Button';

const LoginPage = () => {
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false) 
  const navigate = useNavigate();  // Create the navigate function

  const handleLoginSuccess = (user) => {
    console.log('User logged in successfully:', user);
    navigate('/');  
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

