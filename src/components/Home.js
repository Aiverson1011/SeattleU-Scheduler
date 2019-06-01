
import React from 'react';
import Dashboard from './dashboard';
import App from './app.js';
import Course from './courses/course.js';
import Instructors from './instructors/instructors.js';
import createCourse from './courses/createCourse.js';
import updateCourse from './courses/updateCourse.js'
import createInstructor from './instructors/createInstructor.js';

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
            <Route exact path="/courses/create" component={createCourse}/>
            <Route exact path="/courses/update" component={updateCourse}/>
            <Route exact path="/instructors" component={Instructors}/>
            <Route exact path="/instructors/create" component={createInstructor}/>

  
          </Router>
  
        </main>
  
      );
  
    }
  
  }