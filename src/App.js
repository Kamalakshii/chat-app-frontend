/******************************************************************************
 *  @Purpose        : To import all the pages by using particular path.
 *  @file           : App.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 01-03-2019
 ******************************************************************************/
import React, { Component } from 'react';
import Login  from './screens/login';
import RegisterPage  from './screens/register';
import ForgetPassword from './screens/forgot';
import ResetPage from './screens/reset'
import dashBoard from "./screens/dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <Route path ="/Login" component ={Login} />
      <Route path ="/register" component ={RegisterPage}/>
      <Route path="/forgot" component={ForgetPassword} />
      <Route path="/resetPassword" component={ResetPage} />
      <Route path="/dashBoard" component={dashBoard}></Route>
      </div>
      </Router>
    );
  }
}
export default App;