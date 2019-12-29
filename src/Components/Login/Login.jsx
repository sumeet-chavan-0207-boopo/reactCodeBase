import React, { Component } from 'react';
import classes from './Login.module.css';
import validator from 'validator';
import {fakeAuth} from '../../Auth/Auth';
import { withRouter } from "react-router-dom";

 class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user_name:'',
            user_pass:'',
            name_error:'',
            pass_error:'',
        }
    }
    handleUserName=(event)=>{
      
        this.setState({
            user_name:event.target.value
        })
    }
    handleUserPass=(event)=>{
      
        this.setState({
            user_pass:event.target.value
        })
    }
    handleLogin=()=>{
        const user_name=this.state.user_name;
        const user_pass=this.state.user_pass;
        const self=this;
      
        if(validator.isEmpty(user_name) ){
            this.setState({
              name_error:'Username cannot be blank'
            })
        }
        else if(validator.isEmpty(user_pass)){

            this.setState({
                pass_error:'Password cannot be blank'
              })
        }
        else{
            fakeAuth.authenticate(()=>{
                this.props.history.push('/home')
            });
        }

    }
    render() {
        
        return (
            <div className={classes.main_container}>

                <div className={classes.container}>
                   
                   <div className={classes.signin_label}>Signin</div>
                    <input className={classes.input_login} type="text" onChange={this.handleUserName} 
                    placeholder="Enter Username" name="uname" required/>
                    {this.state.name_error?
                          <div>{this.state.name_error}</div>
                    :''}
                     
                 
                    <input className={classes.input_login} type="password" onChange={this.handleUserPass} 
                    placeholder="Enter Password" name="psw" required/>
                     {this.state.pass_error?
                          <div>{this.state.pass_error}</div>
                    :''}
                
                    <button className={classes.login_button} onClick={this.handleLogin}  >Login</button>
    
                </div>

                                             
            </div>
        )
    }
}
export default withRouter(Login);