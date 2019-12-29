import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="*">
         <Dashboard />
      </Route>
    
    </Switch>  
    </BrowserRouter>
  );
}

export default App;
