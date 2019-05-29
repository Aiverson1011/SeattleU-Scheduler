import React from "react";
import Schedule from "./schedule.js";
import Courses from "./courses.js";
import styles from "../styles/app.module.scss";
import superagent from "superagent";
import Header from "../layout/header.js";
import { UniversityContext } from "../context/index.js";




class App extends React.Component {
  static contextType = UniversityContext;

  constructor(props) {
    super(props);

    this.state = {
      assigned: []
    };
  }

  saveSchedule = () => {
    superagent
      .post("https://demo8340031.mockable.io/schedule")
      .send(this.state.schedule)
      .then(data => {
        let schedule = data.body.schedule;
        this.setState({
          schedule
        });
      });
  };



  render() {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className={styles.scheduler}>
                <div className={styles.sideBar}>
                  <Courses
                    assigned={this.state.assigned}
                    handleDelete={this.handleDelete}
                  />
                </div>

              </div>
            </div>
            <div className="col-sm-10">
              <Schedule />
            </div>
          </div>

        </div>

      </>
    );
  }
}

export default App;
