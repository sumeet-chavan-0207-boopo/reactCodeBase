import {PostReducer} from './PostReducer';
import {FETCH_POSTS,ADD_POST,DELETE_POST} from '../Actions/types';

describe('PostReducer Reducer', () => {

    it('Should return default state', () => {
        const newState = PostReducer(undefined, [1,2,3]);
        console.log(newState);
        expect(newState).toEqual({ state: { items: [] } });
    });

    it('Should return new state if receiving type', () => {
        
        const newState = PostReducer(null, {
            type: ADD_POST,
            payload: [1,2,3]
        });

        console.log()
        expect(newState).toEqual({items:[1,2,3]});

    });

});