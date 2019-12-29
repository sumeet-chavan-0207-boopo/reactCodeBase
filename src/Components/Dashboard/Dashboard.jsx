import React, { Component, Fragment } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Task from '../Task/Task';
import User from '../User/User';
import {fakeAuth} from '../../Auth/Auth';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

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
    return (
      <Route
        {...rest}
        render={({ location }) =>
          fakeAuth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }