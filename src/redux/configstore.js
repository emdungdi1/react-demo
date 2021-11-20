import { createStore, applyMiddleware, compose } from "redux";
import rootreducer from "./../reducers/index";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import mySaga from "./../saga/index";

const composeEnhances =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const sagaMiddleware = createSagaMiddleware();
const configstore = () => {
  const middilware = [thunk, sagaMiddleware];
  const enhancers = [applyMiddleware(...middilware)];
  const store = createStore(rootreducer, composeEnhances(...enhancers));
  sagaMiddleware.run(mySaga);
  return store;
};

export default configstore;
