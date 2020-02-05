import {FETCH_POSTS,ADD_POST,DELETE_POST} from './types';


export const fetchPosts=(no_data)=>dispatch=>{
     fetch('http://jsonplaceholder.typicode.com/todos')
    .then(data=>data.json())
    .then(datajson => {
       dispatch({
           type:FETCH_POSTS,
           payload:datajson
       }) 
    })
   
}

export const addPost=(added_post)=>dispatch=>{
    console.log("add post actions")
 
       dispatch({
           type:ADD_POST,
           payload:[...added_post]
       }) 

}

export const deletePost=(deleted_post)=>dispatch=>{
    console.log("delete post")

    dispatch({
        type:DELETE_POST,
        payload:[...deleted_post]
    })
}

