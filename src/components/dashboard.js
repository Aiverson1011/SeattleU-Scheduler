import React from 'react';
import "../styles/dashboard.css";
import { Link } from 'react-router-dom'


class Dashboard extends React.Component {

  render() {
    return (
      <>
        <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 topBar">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Seattle University</a>
        </nav>

        <div className="container-fluid">
          <div className="row justify-content-md-center">

            <main role="main" className="col-md-12">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
              </div>
            </main>

          </div>

          <div className="row justify-content-md-center">
            <div className="m-1 col-md-5 dashItem">
              <span className="buttonText">Active Schedules</span>
              <div>
                <Link to="/app">Schedule 1</Link>
                <a className="schedLink" href="/"> Schedule 2 </a>
                <a className="schedLink" href="/"> Schedule 3</a>
              </div>


            </div>
            <div className="m-1 col-md-5 dashItem">
              <span className="buttonText">Create New Schedule</span>
            </div>
          </div>

          <div className="row justify-content-md-center">
            <div className="m-1 col-md-5 dashItem">
              <span className="buttonText">Generate Reports</span>
              <div>
                <a className="schedLink" href="/"> Report 1</a>
                <a className="schedLink" href="/"> Report 2</a>
                <a className="schedLink" href="/"> Report 3</a>
              </div>
            </div>
            <div className="m-1 col-md-5 dashItem">
              <span className="buttonText">Archived Schedules</span>
              <div>
                <a className="schedLink" href="/"> Schedule 1 </a>
                <a className="schedLink" href="/"> Schedule 2</a>
              </div>
            </div>
          </div>

          <div className="row justify-content-md-center">
            <div className="m-1 col-md-5 dashItem">
              <Link to="/instructors">
              <span className="buttonText">Manage Instructors</span>
              </Link>
            </div>
            <div className="m-1 col-md-5 dashItem">
            <Link to="/courses">
              <span className="buttonText">Manage Courses</span>
            </Link>
            </div>
          </div>
        </div>
      </>

    );
  }
}

export default Dashboard;