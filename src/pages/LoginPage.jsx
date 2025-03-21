import React, { useState } from 'react';
import LoginForm from '../features/auth/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from '../features/auth/components/ResetPasswordForm';

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
          footer={<button onClick={() => setIsPasswordForgotten(false)}>Back to Login</button>}
        />
      ) : (
        <LoginForm 
          onLoginSuccess={handleLoginSuccess}
          footer={<button onClick={() => setIsPasswordForgotten(true)}>Forgot Password?</button>}
        />
      )}
    </div>
  );
};

export default LoginPage;

