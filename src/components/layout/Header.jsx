import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

import styles from '../../styles/layout';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>EShopApp</Link>
      </div>
      
      <div style={styles.mobileMenuButton} onClick={toggleMenu}>
        <span style={styles.menuBar}></span>
        <span style={styles.menuBar}></span>
        <span style={styles.menuBar}></span>
      </div>
      
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
          {isAuthenticated ? (
            <>
              <li style={styles.navItem}>
                <Link to="/cart" style={styles.navLink}>Cart</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/profile" style={styles.navLink}>Profile</Link>
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
