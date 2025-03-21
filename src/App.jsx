import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Layout } from './components/layout/Layout';
import AppRoutes from './routes';
import './styles/App.css'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
