import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root_reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
window.store = store;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,document.getElementById('root')
  );
})