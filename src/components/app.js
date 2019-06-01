import React from "react";
import Schedule from "./schedule.js";
import Courses from "./courses.js";
import styles from "../styles/app.module.scss";
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


  render() {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <div className={styles.scheduler}>
                <div className={styles.sideBar}>
                  <Courses
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
