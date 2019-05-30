import React from "react";
import styles from "../styles/schedule.module.scss";
import Dropzone from "../styles/dnd/dropzone.js";
import Draggable from "../styles/dnd/draggable.js";
import { UniversityContext } from "../context/index.js";



class Scheduler extends React.Component {
  static contextType = UniversityContext;

  constructor(props) {
    super(props);
  }

  showCourseInfo = (course) => {
    console.log(course);
  }

  render() {
    let scheduleName = this.context.scheduleName;
    let activeQuarter = this.context.activeQuarter;
    let schedule = this.context.quarterSchedule;
    let calendarDays = activeQuarter &&
      Object.keys(schedule).sort((a, b) => {
        return (schedule[a].id - schedule[b].id);
      }) || [];
    return (
      <>
        <ul className={styles.qtrTab}>
          {Object.keys(this.context.quarters).map((qtr, inx) => {
            return <li onClick={() => this.context.changeQuarter(qtr)} key={inx}> {qtr}</li>
          })}
          <li>settings</li>
        </ul>
        <section className={styles.days}>
          {calendarDays.map((day, inx) => {
            let timesofDay = Object.keys(schedule[day].times).sort((a, b) => {
              let timeslot = schedule[day].times
              return (timeslot[a].id - timeslot[b].id);
            }) || [];
            return (
              <div className={styles.dayOfWeek} key={inx}>
                <h3 className={styles.dayText}>{day.toUpperCase()}</h3>

                {timesofDay.map((time, indx) => {
                  return (

                    <div className={styles.scheduleSlot} key={indx}>
                      <h6 className={styles.times}>{time}</h6>
                      <Dropzone
                        handleDrop={({ course }) =>
                          this.context.addToSchedule({ course, day, time, activeQuarter, scheduleName })
                        }
                      >
                        <ul>
                          {
                            schedule &&
                            schedule[day] &&
                            schedule[day].times &&
                            schedule[day].times[time] &&
                            schedule[day].times[time].assigned &&
                            schedule[day].times[time].assigned.map((course, idx) => (
                              <Draggable key={idx} card={{ course, day, time, activeQuarter, scheduleName }}>
                                <li onClick={() => this.showCourseInfo(course)}>
                                  {
                                    this.context.courses.filter((c) => c.id === course.coursesId).reduce((title, masterCourse, idx) => {
                                      return parseInt(course.section) > 1
                                        ? `${masterCourse.courseCode}-${course.section}`
                                        : masterCourse.courseCode;
                                    }, "")

                                  }
                                </li>
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
