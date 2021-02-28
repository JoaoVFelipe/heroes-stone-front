import { Router } from 'react-router-dom';

import Routes from './routes/index';
import history from './services/history';

const App = () => (
  <div>
    <Router history={history}>
      <Routes />
    </Router>
  </div>

);

export default App;
