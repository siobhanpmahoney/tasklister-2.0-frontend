import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle'

import App from './App';
import reducers from './reducers';
import * as Actions from './actions'
import { loadState, saveState } from './localStorage'

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const persistedState = loadState();

function configureStore(){
  return createStore(
    reducers,
    persistedState,
    applyMiddleware(thunk))}
//
const store = configureStore()

// const store = createStore(reducers,
//   applyMiddleware(thunk)
// );

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000));

// store.subscribe(() => {
//   saveState(store.getState())
// });

// store.subscribe(() => {
//   store.getState()
// });

// Connect our store to the reducers


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
