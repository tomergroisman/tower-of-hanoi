import React from 'react';
import {Provider} from 'react-redux';
// import {useCookies} from 'react-cookie';

import {store} from './store';
import Game from './screens/Game';
import {apiRequests} from './utils/requests';

function App() {
  const getToken = async () => {
    const token = (
      await apiRequests.getToken({
        email: 'tomergroisman@gmail.com',
        password: '123456',
      })
    )?.token;
    if (token) {
      console.log(await apiRequests.getUser(token));
    }
  };
  getToken();

  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
