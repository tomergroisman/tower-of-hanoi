import React from 'react';
import {Provider} from 'react-redux';

import {store} from './store';
import Game from './screens/Game';

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
