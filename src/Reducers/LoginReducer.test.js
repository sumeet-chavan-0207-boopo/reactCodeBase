import {LoginReducer} from './LoginReducer';
import {ADD_USER_DETAILS,CHANGE_PASSWORD} from '../Actions/types';

describe('LoginReducer Reducer', () => {

    it('Should return default state', () => {
        let testjson = {loggedin:false,user:{}};
        const newState = LoginReducer(undefined, {});
        expect(newState).toEqual(testjson);
    });

    it('Should return new state if receiving type', () => {
        
        const posts = {name:"sumeet"};
        const newState = LoginReducer(null, {
            type: ADD_USER_DETAILS,
            payload: posts
        });
        expect(newState).toEqual({loggedin:true,user:posts});

    });

});