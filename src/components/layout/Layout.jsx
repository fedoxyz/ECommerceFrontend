import Header from "./Header";
import Footer from "./Footer";

import styles from "../../styles/layout";

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};


export { Header, Footer, Layout };
