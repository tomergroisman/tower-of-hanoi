import {Provider} from 'react-redux';
import {useCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';

import {store} from './store';
import {Router} from './components/Router';

function App() {
  const [cookies] = useCookies(['token']);

  return (
    <Provider store={store}>
      <Router />
      {!cookies.token && <Redirect to="/signup" />}
    </Provider>
  );
}

export default App;
