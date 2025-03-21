import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Protected route component
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
      
      {/* Protected routes */}
      {/* 
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      /> 
      */}
      
      {/* 404 route - must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Simple NotFound component
const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>404</h1>
    <p>Page not found</p>
  </div>
);

export default AppRoutes;
