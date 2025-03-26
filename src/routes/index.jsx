import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/ProfilePage';
import CategoryPage from '../pages/CategoryPage';
import ProductsPage from '../pages/ProductsPage';
import OrderPage from '../pages/OrderPage';
import OrdersPage from '../pages/OrdersPage';
import ProductPage from '../pages/ProductPage';

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
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile-settings" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      /> 
      <Route 
        path="/my-orders" 
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } 
      /> 
      <Route 
        path="/order/:id" 
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        } 
      /> 

      <Route 
        path="/product/:id" 
        element={
          <ProductPage />
        } 
      /> 
      <Route 
        path="/categories" 
        element={
            <CategoryPage />
        } 
      /> 
      <Route 
        path="/products" 
        element={
            <ProductsPage />
        } 
      /> 
    
      
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
