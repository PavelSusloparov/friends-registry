import { createStore, applyMiddleware, Store, compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import { logger } from '../middleware';
import rootReducer, { RootState } from '../reducers';
import client from '../utils/graphql/apolloClient';

export function configureStore(initialState?: RootState) {
  let sagaMiddleware = createSagaMiddleware();
  const apolloClientMiddleware = client.middleware();
  let middleware = applyMiddleware(logger, sagaMiddleware, apolloClientMiddleware);

  if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer, initialState, middleware) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
