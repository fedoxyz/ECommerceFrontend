import React from 'react';
import RegisterForm from '../features/auth/components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { syncGuestCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const navigate = useNavigate();  // Create the navigate function
  const dispatch = useDispatch();

  const handleRegisterSuccess = (user) => {
    // Handle success: Log the user registration, and redirect to the home page
    console.log('User registered successfully:', user);
    dispatch(syncGuestCart());
    // Redirect to the home page (or any other page)
    navigate('/');  // Adjust the path if needed
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
};

export default RegisterPage;

