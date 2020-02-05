// import {createStore,applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import RootReducer from './Reducers/RootReducer';

// const initial_state={};

// export const middleware = [thunk];

// const store=createStore(RootReducer,initial_state,applyMiddleware(...middleware));

// export default store;

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import RootReducer from './Reducers/RootReducer';

export const middleware = [ReduxThunk];

export const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

const store = createStoreWithMiddleware(RootReducer);
export default store;
