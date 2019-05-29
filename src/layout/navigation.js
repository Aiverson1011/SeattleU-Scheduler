import React from "react";
import "../styles/navigation.css";

class Navigation extends React.Component {
    render() {
      return (
        <aside className="navigation">
        <ul>
          <li><a href="/">Schedules</a> </li>
          <li><a href="/">Reports</a></li>
          <li><a href="/">Admin</a></li>
          <li><a href="/">Configurations</a></li>
        </ul>
      </aside>
      );
    }
  }
  
  export default Navigation;