import React, { Component } from 'react';
import classes from './Login.module.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {addUserDetails} from '../../../Actions/LoginAction';
import GoogleLoginComponent from '../../Atoms/GoogleLogin/GoogleLogin';
import FacebookLoginComponent from '../../Atoms/FacebookLogin/FacebookLogin';
import {PostRequestFunction} from '../../../api/ApiHelper';
import {getApiurl} from '../../../api/ApiKeys';
import {setCookieFunction} from '../../Services/CookieController';
import { ValidatorComponent } from 'react-form-validator-core';
import SimpleReactValidator from 'simple-react-validator';

class Login extends Component {
    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state={
            user_name:'',
            user_pass:'',
            name_error:'',
            pass_error:'',
            auth_error:false,
            registerEmail:'',
            registerPassword:'',
            confirmPassword:''

         }
         
    }

    handleUserName=(event)=>{
      
        this.setState({ user_name:event.target.value })
    }

    handleUserPass=(event)=>{
      
        this.setState({ user_pass:event.target.value})
    }

    handleRegistrationBinding=(e)=>{

       this.setState({ [e.target.name] : e.target.value})

    }


    showResponseError = (errorArray) =>{

        if(errorArray)
        {
            if(errorArray.length > 0)
            {
                alert(errorArray[0].message)
            }
        }
    }


    handleRegistration = async () =>{
        //this.validator.allValid()
        let emailvalid = this.validator.fieldValid('registerEmail');
        let passvalid = this.validator.fieldValid('registerPassword');
        let conpassvalid = this.validator.fieldValid('confirmPassword');

        if(emailvalid && passvalid && conpassvalid)
        {
            let registerEmail = this.state.registerEmail;
            let registerPassword = this.state.registerPassword;
            let confirmPassword = this.state.confirmPassword;
            let url = getApiurl("createstudent");
            let registerparam = { 
                email : registerEmail,
                password : registerPassword,
                confirmPassword : confirmPassword

            }

            let createdStudent = await PostRequestFunction(url,{},registerparam);
            if(createdStudent.success)
            {
                alert("Sucessful please login");
                window.location.reload();
            }else
            {
                this.showResponseError(createdStudent.errors)
            }
        }else
        {

            //this.validator.showMessages();
            this.validator.showMessageFor('registerEmail')
            this.validator.showMessageFor('registerPassword')
            this.validator.showMessageFor('confirmPassword')
            this.forceUpdate();
        }
 
        
    }

    handleLogin= async()=>{

        let uname = this.validator.fieldValid('uname');
        let psw = this.validator.fieldValid('psw');
         if(uname && psw)
         {
                let user_name=this.state.user_name;
                let user_pass=this.state.user_pass;
                let url = getApiurl("login");

                let loginparam = { 
                    email : user_name,
                    password : user_pass,
                }

                let loginuser = await PostRequestFunction(url,{},loginparam);
                console.log(loginuser)
                if(loginuser.success)
                {
                    let gettoken = loginuser.data;
                    setCookieFunction("token",gettoken[0].token)
                    this.props.history.push('/home')
                }
         }else
         {
            //this.validator.showMessages();
            this.validator.showMessageFor('uname')
            this.validator.showMessageFor('psw')
            this.forceUpdate();
         }
        

    }
    render() {
            this.validator.purgeFields();
        return (
            <div>
                <div className={classes.main_container} data-test="loginComponent">

                    <div className={classes.container} >
                       
                       <div className={classes.signin_label}>Signin</div>
               
                        <input className={classes.input_login} type="text" value={this.state.user_name} onChange={this.handleUserName} 
                        placeholder="Enter Username" name="uname"/>
                        {this.validator.message('uname', this.state.user_name, 'required|email')}
                        <input className={classes.input_login} type="password" value={this.state.user_pass} onChange={this.handleUserPass} 
                        placeholder="Enter Password" name="psw"/>
                         {this.validator.message('psw', this.state.user_pass, 'required|min:8')}
                        <button className={classes.login_button} onClick={this.handleLogin}>Login</button>
                        <br/>
                  
                    </div>
                </div>
                <div className={classes.main_container} data-test="loginComponent">
                    <div className={classes.container} >
                       
                       <div className={classes.signin_label}>Signup</div>
                        
                        <input className={classes.input_login} type="text" id ="registerEmail" value={this.state.registerEmail} onChange={this.handleRegistrationBinding} 
                        placeholder="Enter Email" name="registerEmail" />
                        {this.validator.message('registerEmail', this.state.registerEmail, 'required|email')}

                        <input className={classes.input_login} type="password" value={this.state.registerPassword}
                        onChange={this.handleRegistrationBinding} placeholder="Enter Password" name="registerPassword"/>
                        {this.validator.message('registerPassword', this.state.registerPassword, 'required|min:8')}

                        <input className={classes.input_login} type="password" value={this.state.confirmPassword}
                        onChange={this.handleRegistrationBinding} placeholder="confirm Password" name="confirmPassword"/>
                        {this.validator.message('confirmPassword', this.state.confirmPassword, 'required|min:8|in:'+this.state.registerPassword+" , "+this.state.confirmPassword)}
                        <button className={classes.login_button} onClick={this.handleRegistration}>Register</button>
                        <br/>
                    </div>
               
                </div>
            </div>
        )
    }
}
export default withRouter(connect(null,{addUserDetails})(Login));