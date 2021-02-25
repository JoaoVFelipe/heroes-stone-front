import { Router } from 'react-router-dom';

import Routes from './routes/index';
import history from './services/history';

const App = () => (
  <Router  history={history}>
    <Routes />
  </Router>
);

export default App;