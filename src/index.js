import React from "react";
import ReactDOM from "react-dom";
import Home from './components/Home.js';
import CourseContext from './context/index.js';


function Main() {
  return (
    <CourseContext>
      <Home />
    </CourseContext>

  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);

