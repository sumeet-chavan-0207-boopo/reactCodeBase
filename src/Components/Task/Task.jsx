import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import classes from  './Task.module.css';
import {fetchPosts,addPost,deletePost} from '../../Actions/PostAction';

export default function Task() {

    const [task_list,setTaskList]=useState([]);
    const [title_name,setTitleName]=useState([]);
    const [status,setStatus]=useState([]);
    const posts=useSelector(state=> state.posts.items)
    const dispatch=useDispatch();



    useEffect(()=>{
         
        if(!posts){
            setNewTaskList(fetchPosts,'')
        }
        
    
    },[]);


    const handleDeleteList=(list_id)=>{
        const tasklist=posts;

        const final_list= tasklist.filter(element=>{
            return element.id!=list_id;
        });

        setNewTaskList(deletePost,final_list)

    }
    const handleTitleChange=(event)=>{
        setTitleName(event.target.value);
     
    }
    const handleStatusChange=(event)=>{
        setStatus(event.target.value);
      
    }
    const handleInsertion= ()=>{
        
        const newtasklist=[...posts];
        const len=newtasklist.length;
        const last_id=newtasklist[len-1].id;
       
        const new_task={
            userId:1,
            id:last_id+1,
            title:title_name,
            completed:status
        }


        newtasklist.push(new_task); 
        
     
        setNewTaskList(addPost,newtasklist)

    }
    const setNewTaskList=(action_type,data)=>{
    
       
        dispatch(action_type(data))

    }

    return (
        <div>
            <div style={{height:'500px',overflowY:'scroll',padding:'5%'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Completed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                       {posts && posts.map((ele,index)=>{
                         
                            return <tr key={ele.id}>
                                        <td>{ele.id}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.completed.toString()}</td>
                                        <td><Button  variant="danger" onClick={()=>{handleDeleteList(ele.id)}}>DELETE</Button></td>
                                    </tr>

                          
                            
                       })} 
                    
                    </tbody>
                </Table>


            </div>

           <div className={classes.new_task}>          
                <div>
                <input onChange={handleTitleChange} type="text" placeholder="Enter title"></input>  
                </div>
                <div className={classes.task_marg_tp_10}>      
                    <input onChange={handleStatusChange} type="text" placeholder="Enter completed status (True/false)"></input> 
                </div>      
                <Button className={classes.task_marg_tp_10} onClick={handleInsertion} variant="primary">ADD TASK</Button>
            </div>  

        </div>
    )
}
