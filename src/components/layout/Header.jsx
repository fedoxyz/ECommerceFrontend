import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { SearchBar } from '../common/SearchBar';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/layout';
import { clearCart, setHasFetchedCart } from '../../features/cart/cartSlice';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart(true));
    navigate("/");    
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Arterique</Link>
      </div>
      
      <div style={styles.mobileMenuButton} onClick={toggleMenu}>
        <span style={styles.menuBar}></span>
        <span style={styles.menuBar}></span>
        <span style={styles.menuBar}></span>
      </div>
      <SearchBar/> 
      <nav style={menuOpen ? {...styles.nav, ...styles.navOpen} : styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/products" style={styles.navLink}>Products</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/categories" style={styles.navLink}>Categories</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/cart" style={styles.navLink}>Cart</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li style={styles.navItem}>
                <Link to="/my-orders" style={styles.navLink}>My orders</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/profile-settings" style={styles.navLink}>Profile</Link>
              </li>
              <li style={styles.navItem}>
                <button 
                  onClick={handleLogout} 
                  style={{...styles.navLink, ...styles.button}}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li style={styles.navItem}>
                <Link to="/login" style={styles.navLink}>Login</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/register" style={styles.navLink}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
