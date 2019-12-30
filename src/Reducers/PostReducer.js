import {FETCH_POSTS,ADD_POST,DELETE_POST} from '../Actions/types';

const initial_state={
    items:[]
}


export const  PostReducer= (state=initial_state,action)=>{

    console.log(action)
    switch(action.type){
        case FETCH_POSTS:
            return{
                items:action.payload 
            }
        case ADD_POST:
            return{
                items:action.payload
            }    
        case DELETE_POST:
            return{
                items:action.payload
            }    
        default:
            return{
                state
            }

    }

}

