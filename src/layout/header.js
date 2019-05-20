import React from "react";
import "../styles/header.css";

class Header extends React.Component {
    render() {
      return (
        <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 topBar">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Seattle University</a>
      </nav>
      );
    }
  }
  
  export default Header;