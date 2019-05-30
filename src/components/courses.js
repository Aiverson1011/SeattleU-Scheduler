import React from "react";
import "../styles/courses.scss";
import Draggable from "../styles/dnd/draggable.js";
import DropZone from "../styles/dnd/dropzone.js";
import { UniversityContext } from "../context/index.js";


class Courses extends React.Component {
  static contextType = UniversityContext;


  render() {
    console.log("rendering....")
    let courses = this.context.generateCoursesList();
    return (

      <aside className="courses">
        <h2 className="headerr">{this.context.scheduleName}</h2>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">Filter</div>
          </div>
          <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Course Code" />
        </div>
        <div className="courseTypes">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" />
            <label className="form-check-label" htmlFor="inlineRadio1">UG</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" />
            <label className="form-check-label" htmlFor="inlineRadio2">Grad</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="3" />
            <label className="form-check-label" htmlFor="inlineRadio1">Cert</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="4" />
            <label className="form-check-label" htmlFor="inlineRadio2">Mixed</label>
          </div>
        </div>

        <div className="filterList">
          <ul>
            {courses.map((course, index) => (

              <Draggable key={`course-${index}`} card={{ course }}>
                <li>
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
        </div>
        <div className="qtrSettings row">
          <button type="button" className="btn btn-outline-success col-sm-6">Add Course</button>
          <button type="button" onClick={this.context.saveSchedule} className="btn btn-outline-danger col-sm-6">Save</button>
        </div>
        <div className=""></div>
        <ul className="assigned">
          {this.props.assigned.map((course, index) => (
            <li key={`assigned-${index}`}>
              {course}
            </li>
          ))}
        </ul>

        <DropZone handleDrop={this.context.handleDelete}>
          <div id="trash"> </div>
        </DropZone>
      </aside>
    );
  }
}

export default Courses;
