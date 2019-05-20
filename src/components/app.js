import React from "react";
import Schedule from "./schedule.js";
import Courses from "./courses.js";
import styles from "../styles/app.module.scss";
import superagent from "superagent";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Amanda",
      schedule: {
        Monday: {
          "9:00a - 9:50a": [],
          "10:00a - 10:50a": [],
          "11:00a - 11:50a": [],
          "1:00a - 1:50a": [],
          "2:00a - 2:50a": [],
          "3:00a - 3:50a": []
        },
        Tuesday: {
          "9:00a - 9:50a": [],
          "10:00a - 10:50a": [],
          "11:00a - 11:50a": [],
          "1:00a - 1:50a": [],
          "2:00a - 2:50a": [],
          "3:00a - 3:50a": []
        },
        Wednesday: {
          "9:00a - 9:50a": [],
          "10:00a - 10:50a": [],
          "11:00a - 11:50a": [],
          "1:00a - 1:50a": [],
          "2:00a - 2:50a": [],
          "3:00a - 3:50a": []
        },
        Thursday: {
          "9:00a - 9:50a": [],
          "10:00a - 10:50a": [],
          "11:00a - 11:50a": [],
          "1:00a - 1:50a": [],
          "2:00a - 2:50a": [],
          "3:00a - 3:50a": []
        },
        Friday: {
          "9:00a - 9:50a": [],
          "10:00a - 10:50a": [],
          "11:00a - 11:50a": [],
          "1:00a - 1:50a": [],
          "2:00a - 2:50a": [],
          "3:00a - 3:50a": []
        }
      },
      courses:{
        
      },
      assigned: []
    };
  }

  handleDrop = entry => {
    console.log(entry);

    let { course, day, time } = entry;
    this.setState({
      ...this.state,
      courses: this.state.courses.filter(item => item !== course),
      assigned: this.state.assigned.includes(course)
        ? this.state.assigned
        : [...this.state.assigned, course],
      schedule: {
        ...this.state.schedule,
        [day]: {
          ...this.state.schedule[day],
          [time]: [...this.state.schedule[day][time], course]
        }
      }
    });
  };

  refreshState = () => {
    superagent.get("http://demo7986744.mockable.io/schedule").then(data => {
     // let schedule = data.body.schedule;
      console.log(data.body);
      // this.setState({
      //   schedule
      // });
    });
  };

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

  handleDelete = entry => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    let { course, day, time, idx } = entry;
    console.log(course, day, time, idx);
    this.setState({
      ...this.state,
      schedule: {
        ...this.state.schedule,
        [day]: {
          ...this.state.schedule[day],
          [time]: this.state.schedule[day][time].filter((item, i) => i !== idx)
        }
      }
    });
  };
  componentDidMount() {
    this.refreshState();
  }
  render() {
    return (
      <>
        <button onClick={this.saveSchedule}>SAVE</button>
        <div className={styles.scheduler}>
          <Courses
            courses={this.state.courses}
            assigned={this.state.assigned}
            handleDelete={this.handleDelete}
          />

          <Schedule
            schedule={this.state.schedule}
            handleDrop={this.handleDrop}
          />
        </div>

      </>
    );
  }
}

export default App;
