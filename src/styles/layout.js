// CSS-in-JS styles
const styles = {
  // Layout styles
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: '1',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  
  // Header styles
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#4a4a4a',
  },
  mobileMenuButton: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '30px',
    height: '21px',
    cursor: 'pointer',
    '@media (maxWidth: 768px)': {
      display: 'flex',
    }
  },
  menuBar: {
    height: '3px',
    width: '100%',
    backgroundColor: '#333',
    borderRadius: '3px',
  },
  nav: {
    '@media (maxWidth: 768px)': {
      position: 'absolute',
      top: '60px',
      left: '0',
      right: '0',
      backgroundColor: '#ffffff',
      height: '0',
      overflow: 'hidden',
      transition: 'height 0.3s ease',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    }
  },
  navOpen: {
    height: 'auto',
    padding: '10px 0',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    '@media (maxWidth: 768px)': {
      flexDirection: 'column',
    }
  },
  navItem: {
    margin: '0 10px',
    '@media (maxWidth: 768px)': {
      margin: '10px 20px',
    }
  },
  navLink: {
    textDecoration: 'none',
    color: '#4a4a4a',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#0066cc',
    }
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    fontSize: 'inherit',
    fontFamily: 'inherit',
  },
  
  // Footer styles
  footer: {
    backgroundColor: '#f8f8f8',
    padding: '40px 20px 20px',
    marginTop: 'auto',
  },
  footerContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (maxWidth: 768px)': {
      flexDirection: 'column',
    }
  },
  footerSection: {
    flex: '1',
    minWidth: '250px',
    margin: '0 20px 20px 0',
  },
  footerHeading: {
    fontSize: '18px',
    marginBottom: '15px',
    color: '#333',
  },
  footerText: {
    margin: '10px 0',
    color: '#666',
    lineHeight: '1.5',
  },
  footerList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  footerLink: {
    textDecoration: 'none',
    color: '#666',
    display: 'block',
    padding: '5px 0',
    transition: 'color 0.2s ease',
    ':hover': {
      color: '#0066cc',
    }
  },
  footerBottom: {
    borderTop: '1px solid #e0e0e0',
    paddingTop: '20px',
    marginTop: '20px',
    textAlign: 'center',
  },
  copyright: {
    color: '#888',
    fontSize: '14px',
  }
};

export default styles;
