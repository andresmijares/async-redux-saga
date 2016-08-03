/* eslint-disable import/default */
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router,  browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico');
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';


const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);
