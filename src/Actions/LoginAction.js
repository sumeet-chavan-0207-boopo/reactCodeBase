import {ADD_USER_DETAILS} from './types';


export const addUserDetails=(user_details)=>dispatch=>{
    console.log("add user actions",user_details)

 
       dispatch({
           type:ADD_USER_DETAILS,
           payload:{...user_details}
       }) 

}
