import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './Reducers/RootReducer';

const initial_state={};

const middleware = [thunk];

const store=createStore(RootReducer,initial_state,applyMiddleware(...middleware));

export default store;
