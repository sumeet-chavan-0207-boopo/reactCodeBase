import React from 'react';
import './App.css';
import Login from './Components/Molecules/Login/Login';
import Dashboard from './Components//Molecules/Dashboard/Dashboard';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {


  return (
    <Provider store={store}> 
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="*">
          <Dashboard />
        </Route>
      
      </Switch>  
      </BrowserRouter>
    </Provider>
  );
}

export default App;
