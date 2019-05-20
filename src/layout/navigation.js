import React from "react";
import "../styles/navigation.css";

class Navigation extends React.Component {
    render() {
      return (
        <aside className="navigation">
        <ul>
          <li><a href="">Schedules</a>
          <em className="glyphicon glyphicon-chevron-right" data-toggle="collapse" data-target="#be48fb72-d025-4f51-850e-6bc90ec3bb20"></em></li>
          <li><a href="">Reports</a></li>
          <li><a href="">Admin</a></li>
          <li><a href="">Configurations</a></li>
        </ul>
      </aside>
      );
    }
  }
  
  export default Navigation;