import React from "react";
import styles from "../styles/schedule.module.scss";
import Dropzone from "../styles/dnd/dropzone.js";
import Draggable from "../styles/dnd/draggable.js";

class Scheduler extends React.Component {
  render() {
    return (
      <section className={styles.days}>
        {Object.keys(this.props.schedule).map((day, inx) => (
          <div key={inx}>
            <h2>{day}</h2>

            {Object.keys(this.props.schedule[day]).map((time, indx) => (
              <div key={indx}>
                <h3>{time}</h3>
                <Dropzone
                  handleDrop={({ course }) =>
                    this.props.handleDrop({ course, day, time })
                  }
                >
                  <ul>
                    {this.props.schedule &&
                      this.props.schedule[day] &&
                      this.props.schedule[day][time] &&
                      this.props.schedule[day][time].map((course, idx) => (
                        <Draggable key={idx} card={{ course, day, time, idx }}>
                          <li>{course}</li>
                        </Draggable>
                      ))}
                  </ul>
                </Dropzone>
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  }
}

export default Scheduler;
