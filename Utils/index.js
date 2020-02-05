import { applyMiddleware, createStore } from 'redux';
import { middleware } from './../src/store';
import RootReducer from '../src/Reducers/RootReducer';

export const findByTestAtrr = (component, attr,datatest) => {
    const wrapper = component.find(`[datatest='${attr}']`);
    return wrapper;
};

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(RootReducer, initialState);
};
