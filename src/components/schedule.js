import React from "react";
import styles from "../styles/schedule.module.scss";
import Dropzone from "../styles/dnd/dropzone.js";
import Draggable from "../styles/dnd/draggable.js";
import { UniversityContext } from "../context/index.js";
import superagent from 'superagent';



class Scheduler extends React.Component {
  static contextType = UniversityContext;

  constructor(props) {
    super(props);
    this.state = {
      quarters: {},
      schedule: {},
      scheduleCourses: {}
    }
  }

  componentDidMount() {
    {
      Object.keys(this.context.schedule).map((scheduleName, inx) => {
        this.setState(
          {
            quarters: this.context.schedule[scheduleName].quarters,
            scheduleName
          }
        )
      })
    }
  }

  showCourseInfo = (course) => {
    console.log(course);
  }

  changeQuarter = (activeQuarter) => {
    // make a call to get scheduleItems with quarterscheduleid(async)
    // with result...set state
    let qtrId = this.state.quarters[activeQuarter].id;
    // make the call out
    this.context.refreshQuarter(qtrId);
    this.setState(
      {
        activeQuarter,
        schedule: this.state.quarters[activeQuarter].days
      }
    )
  }

  render() {
    let scheduleName = this.state.scheduleName;
    let activeQuarter = this.state.activeQuarter;
    let calendarDays = activeQuarter &&
      Object.keys(this.context.schedule[scheduleName].quarters[activeQuarter].days).sort((a, b) => {
        let dayof = this.context.schedule[scheduleName].quarters[activeQuarter].days
        return (dayof[a].id - dayof[b].id);
      }) || [];
    return (
      <>
        <ul className={styles.qtrTab}>
          {Object.keys(this.state.quarters).map((qtr, inx) => {
            return <li onClick={() => this.changeQuarter(qtr)} key={inx}> {qtr}</li>
          })}
          <li>settings</li>
        </ul>
        <section className={styles.days}>
          {calendarDays.map((day, inx) => {
            let timesofDay = Object.keys(this.state.schedule[day].times).sort((a, b) => {
              let timeslot = this.state.schedule[day].times
            return (timeslot[a].id - timeslot[b].id);
          }) || [];
          return (
              <div className={styles.dayOfWeek} key={inx}>
            <h3 className={styles.dayText}>{day.toUpperCase()}</h3>

            {timesofDay.map((time, indx) => {
              let timeslotid = this.state.schedule[day].times[time].id;
              return (

                <div className={styles.scheduleSlot} key={indx}>
                  <h6 className={styles.times}>{time}</h6>
                  <Dropzone
                    handleDrop={({ course }) =>
                      this.context.addToSchedule({ course, day, time, activeQuarter, scheduleName })
                    }
                  >
                    <ul>
                      {this.state.schedule &&
                        this.state.schedule[day] &&
                        this.state.schedule[day].times &&
                        this.state.schedule[day].times[time] &&
                        this.state.schedule[day].times[time].assigned &&
                        this.state.schedule[day].times[time].assigned.map((course, idx) => (
                          <Draggable key={idx} card={{ course, day, time, activeQuarter, scheduleName }}>
                            <li onClick={() => this.showCourseInfo(course)}>
                              {this.context.courses.filter((c) => c.id === course.coursesid)[0].courseCode}</li>
                          </Draggable>
                        ))}
                    </ul>
                  </Dropzone>
                </div>
              )
            })}
          </div>
          )
        })}
        </section>
      </>
    );
  }
}

export default Scheduler;
