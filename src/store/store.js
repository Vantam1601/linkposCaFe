import { applyMiddleware, compose, createStore } from "redux";
import createDebugger from "redux-flipper";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

// import AsyncStorage from '@react-native-community/async-storage';
// import logger from 'redux-logger';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  // const devMode = __DEV__;
  let enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  if (__DEV__) {
    enhancer = composeEnhancers(
      applyMiddleware(sagaMiddleware, createDebugger())
    );
  }

  // const appReducer = (state, action) => {
  //   if (action.type === 'ON_SET_TOKEN' && action.payload === '') {
  //     return rootReducer(undefined, action);
  //   }

  //   return rootReducer(state, action);
  // };

  const store = createStore(rootReducer, enhancer);
  //
  const persistor = persistStore(store, {
    debounce: 100,
  });
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
//
const { store, persistor } = configureStore();
//
export { store, persistor };
