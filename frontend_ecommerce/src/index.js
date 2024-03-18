import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Provider } from 'react-redux'
import store from './store'

import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
// axios.defaults.baseURL = 'http://ec2-18-118-51-156.us-east-2.compute.amazonaws.com/';
axios.defaults.baseURL = 'http://localhost:8001/';
axios.defaults.withCredentials = true;



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
