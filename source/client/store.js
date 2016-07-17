import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';
import actionTypeMiddleware from 'utils/redux/actionTypeMiddleware';

const configureStore = (initialState = {}) => {
  const store = compose(
    applyMiddleware(
      actionTypeMiddleware,
      thunkMiddleware
    )
  )(createStore)(reducers, initialState);

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
      }
    );
  }

  return store;
};

const store = configureStore(window.__INITIAL_STATE__ || {});

export default store;
