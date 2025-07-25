import React from 'react';
// import "@fontsource/poppins";

import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
       <App />
    </Provider>
  </React.StrictMode>
);