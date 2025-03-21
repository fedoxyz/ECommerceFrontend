import { Link } from 'react-router-dom';

import styles from "../../styles/layout";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h3 style={styles.footerHeading}>EShopApp</h3>
          <p style={styles.footerText}>Your one-stop shop for all your needs.</p>
        </div>
        
        <div style={styles.footerSection}>
          <h3 style={styles.footerHeading}>Quick Links</h3>
          <ul style={styles.footerList}>
            <li><Link to="/" style={styles.footerLink}>Home</Link></li>
            <li><Link to="/products" style={styles.footerLink}>Products</Link></li>
            <li><Link to="/contact" style={styles.footerLink}>Contact Us</Link></li>
          </ul>
        </div>
        
        <div style={styles.footerSection}>
          <h3 style={styles.footerHeading}>Contact</h3>
          <p style={styles.footerText}>Email: contact@eshopapp.com</p>
          <p style={styles.footerText}>Phone: (123) 456-7890</p>
        </div>
      </div>
      
      <div style={styles.footerBottom}>
        <p style={styles.copyright}>
          &copy; {new Date().getFullYear()} EShopApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
