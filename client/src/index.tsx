import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';

import {init as i18nInit} from './strings/i18n.config';
import {store} from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';

i18nInit();

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
