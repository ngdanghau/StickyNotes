import { applyMiddleware, createStore } from 'redux';
//import { createLogger } from 'redux-logger'
//import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from '../reducers';
import thunk from 'redux-thunk'


// Build the middleware for intercepting and dispatching navigation actions
//const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(
  reducer, applyMiddleware(thunk));