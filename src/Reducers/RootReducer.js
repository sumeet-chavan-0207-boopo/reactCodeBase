import {combineReducers} from 'redux';
import {PostReducer}from './PostReducer';
import {LoginReducer} from './LoginReducer';


export default combineReducers({
    posts:PostReducer,
    login:LoginReducer
})