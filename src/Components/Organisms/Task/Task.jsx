import React,{useEffect,useState,useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import classes from  './Task.module.css';
import {fetchPosts,addPost,deletePost} from '../../../Actions/PostAction';
import Pagination from '../../Atoms/StaticPagination/Pagination';
import {PostRequestFunction} from '../../../api/ApiHelper';

export default function Task() {

    const [title_name,setTitleName]=useState([]);
    const [status,setStatus]=useState([]);
    const [newpost,setNewPost]=useState([]);
    const input_title = useRef(null);
    const input_status = useRef(null);
    const posts=useSelector(state=> state.posts.items);
    console.log(posts)
    const dispatch=useDispatch();
    
    useEffect(()=>{

        if(!posts){
            setNewTaskList(fetchPosts,'')
        }

    },[]);


    const handleDeleteList=(list_id)=>{

        const tasklist=posts;
        const final_list= tasklist.filter(element=>{
            return element.id!==list_id;
        });
        setNewTaskList(deletePost,final_list)
    }

    const handleTitleChange=(event)=>{
        setTitleName(event.target.value);
    }

    const handleStatusChange=(event)=>{
        setStatus(event.target.value);
    }


    const handlePagination = (getposts) =>{

        setNewPost(getposts);
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

    // const checkGetApiRequest = async() =>{

    //     let restapi = await GetRequestFunction("https://jsonplaceholder.typicode.com/posts",{},{});
    //     setNewPost(restapi);
        
    // }

    const checkPostApiRequest = async() =>{

        let restapi = await PostRequestFunction("https://sumeet.free.beeceptor.com/my/api/path",{'Content-Type': 'application/json'},{"data":"Hello Beeceptor"});
        console.log(restapi);
    }

    return (

        <div>
            <div className={classes.task_container} test-data="">
                <Table striped bordered hover id="tasktbl">
                    <thead>
                        <tr className={classes.task_tr}>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Completed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                       {newpost && newpost.map((ele,index)=>{
                         
                            return <tr key={ele.id}>
                                        <td>{ele.id}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.completed.toString()}</td>
                                        <td><Button  variant="danger" onClick={()=>{handleDeleteList(ele.id)}}>DELETE</Button></td>
                                    </tr>

                        })} 
                    
                    </tbody>
                </Table>
                <div>
                   <Pagination items={posts} onChangePage={handlePagination} pageSize={5}/> 
                </div>

            </div>

           <div className={classes.new_task}>          
                <div>
                <input onChange={handleTitleChange} ref={input_title} type="text" placeholder="Enter title"></input>  
                </div>
             
                <div className={classes.task_marg_tp_10}>      
                    <input onChange={handleStatusChange} ref={input_status} type="text" placeholder="Enter status (True/false)"></input> 
                </div>
              <Button className={classes.task_marg_tp_10} onClick={handleInsertion} variant="primary">ADD TASK</Button>
              <Button className={classes.task_marg_tp_10} onClick={checkPostApiRequest} variant="primary">Check api</Button>
            </div> 

        </div>


    )
}
