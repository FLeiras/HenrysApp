import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './Redux/store/store';
import axios from 'axios';
import { Auth0Provider } from '@auth0/auth0-react';

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

const DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    redirectUri={window.location.origin}
    audience="https://dev-oy1v7fiv.us.auth0.com/api/v2/"
    // scope="read:current_user"
  >
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
