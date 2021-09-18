import React from 'react';
import Bugsnag from '@bugsnag/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createSagaMiddleware from 'redux-saga';
import { Navigation } from './Navigation';
import reducer from './reducers';
import saga from './sagas';

Bugsnag.start();

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persist = persistStore(store);
sagaMiddleware.run(saga);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};
