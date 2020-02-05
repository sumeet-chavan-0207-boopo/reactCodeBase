import React, { Component } from 'react';
import {PostRequestFunction} from '../../../api/ApiHelper';
import {checkAuthentication} from '../../../Auth/Auth';
import {getCookieFunction} from '../../Services/CookieController';

class Student extends Component {

    constructor(props){
        super(props);
        this.state={
            
            studentid:'',
            name:''  
        }
        this.permissionsArray = [];
        this.token = null;
    }

    componentDidMount(){
        this.token = getCookieFunction("token");
        this.permissionsArray = checkAuthentication("create_student")
    }

    insertData = async () =>{

        let id  = this.state.studentid;
        let name = this.state.name;
        let url = "https://node-base-api.herokuapp.com/student/create";
        let data = {
            "name": name,
            "class": id
        }
        let header = {bearer : this.token}
        let stdinfo  = await PostRequestFunction(url,header,data);
       
        if(stdinfo.success)
        {
            alert("added successfully")
        }else
        {
            let msz= stdinfo.errors[0].message;
            if(msz)
            {
                alert(msz)
            }
            
        }
        
    }

    handleUserName = (e) =>{

       this.setState({ name : e.target.value});
        
    }

    handleUserId = (e) =>{

        this.setState({ studentid : e.target.value});
    }

    render() {
        
        return (
            <div data-test="loginComponent">

                <div>
                    <div>
                        <input type="text" onChange={this.handleUserId} 
                        placeholder="Enter Id" name="uname"  value={this.state.studentid}/>
                    </div>
                    <div>
                        <input type="text" onChange={this.handleUserName} 
                        placeholder="Enter Name" name="psw" value={this.state.name}/>
                    </div>
                    <button onClick={this.insertData}>Add</button>
                </div>

            </div>
        )
    }
}
export default Student;
