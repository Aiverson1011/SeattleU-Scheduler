
import React from 'react';
import Dashboard from './dashboard';
import App from './app.js';
import Course from './course.js';
import Instructors from './instructors.js';

import { BrowserRouter as Router, Route } from "react-router-dom"


export default class Home extends React.Component {

    render(){
  
      const HOME_ROUTE = '/';
  
      return(
  
        <main>
  
          <Router>
            <Route exact path={HOME_ROUTE} component={Home}/>
  
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/app" component={App}/>
            <Route exact path="/courses" component={Course}/>
            <Route exact path="/instructors" component={Instructors}/>



  
          </Router>
  
        </main>
  
      );
  
    }
  
  }