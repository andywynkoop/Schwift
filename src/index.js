import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root_reducer';
import thunk from 'redux-thunk';
import App from './App';

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk))

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
    ,document.getElementById('root')
  );
})