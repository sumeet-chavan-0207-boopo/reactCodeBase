import React, { Component, Fragment } from 'react';
import Header from '../Header/Header';
import Task from '../../Organisms/Task/Task';
import Student from '../Mongocheck/Student';
import ShowStudent from '../Mongocheck/ShowStudent';
import {Route,Redirect} from 'react-router-dom';

export default class Dashboard extends Component {

    render(props) {
        return (
            <Fragment>
                <Header/>
                <PrivateRoute path="/task">
                         <Task />  
                </PrivateRoute>
                <PrivateRoute path="/user">
                         <Student />  
                </PrivateRoute>  
                 <PrivateRoute path="/students">
                         <ShowStudent />  
                </PrivateRoute>            
            </Fragment>         
        )
    }
}

function PrivateRoute({ children, ...rest }) {
   return (
      <Route {...rest}
        render={({ location}) =>
          true? 
            (children) 
          : 
            ( <Redirect to={{ pathname: "/",state: { from: location }}} /> )
          }
      />
    );
  }