import React from "react";
import "../styles/courses.scss";
import Draggable from "../styles/dnd/draggable.js";
import DropZone from "../styles/dnd/dropzone.js";

class Courses extends React.Component {
  render() {
    return (
      <aside className="courses">
        <ul>
         {this.props.courses.map((course, index) => (
            <Draggable card={{ course }}>
              <li id={index} key={index}>
                {course}
              </li>
            </Draggable>
          ))}
        </ul>

        <ul className="assigned">
          {this.props.assigned.map((course, index) => (
            <li id={index} key={index}>
              {course}
            </li>
          ))}
        </ul>

        <DropZone handleDrop={this.props.handleDelete}>
          <div id="trash"> </div>
        </DropZone>
      </aside>
    );
  }
}

export default Courses;
