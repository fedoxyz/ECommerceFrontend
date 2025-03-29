import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const { isAuthenticated, status, user, isLoginProcessed } = useSelector(state => state.auth);

  console.log("AuthRoute Check:", { isAuthenticated, status, user });

  if (isAuthenticated && status === 'succeeded' && isLoginProcessed) {
    console.log("Redirecting to /");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;

