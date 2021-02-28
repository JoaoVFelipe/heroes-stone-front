import { Router } from 'react-router-dom';

import Routes from './routes/index';
import Footer from './components/Footer';
import history from './services/history';

const App = () => (
  <div>
    <Router history={history}>
      <Routes />
    </Router>
    <Footer />

  </div>

);

export default App;
