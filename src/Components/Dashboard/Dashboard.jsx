import React, { Component, Fragment } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Task from '../Task/Task';
import User from '../User/User';
import {Route,Redirect} from 'react-router-dom';

export default class Dashboard extends Component {
    render(props) {
        return (
            <Fragment>
                    <Header/>

                    <PrivateRoute path="/home">
                             <Home />  
                    </PrivateRoute>
                    <PrivateRoute path="/task">
                             <Task />  
                    </PrivateRoute>
                    <PrivateRoute path="/user">
                             <User />  
                    </PrivateRoute>
                   
            </Fragment>         
        )
    }
}



function PrivateRoute({ children, ...rest }) {
  const isAuthenticated=sessionStorage.getItem("isAuthenticated");
 

    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated==='true' ? 
          (  children) 
        : 
          ( <Redirect to={{ pathname: "/",state: { from: location }}} /> )
        }
      />
    );
  }