import React from "react";
import Navigation from "../layout/navigation.js";
import Header from "../layout/header.js";
import { UniversityContext } from "../context/index.js";

class Course extends React.Component {
  static contextType = UniversityContext;
  constructor(props) {
    super(props);

    this.state = {
      filterResult: [],
      searchTerm: "",
      classType: "",
      activeCourse: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    this.setState({
      filterResult: this.context.courses
    })
  }

  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value }, this.filterCourses);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  resetFilter = () => {
    this.setState({ searchTerm: '', classType: 'all', activeCourse: true, filterResult: this.context.courses });
  }

  filterCourses = () => {
    var result = this.context.courses;
    if ((this.state.searchTerm === "") && (this.state.classType === "" || this.state.classType === "all")) {
      result = result.filter(f => f.isActive === this.state.activeCourse);
    } else {
      if (this.state.searchTerm) {
        result = result.filter(f => (f.courseCode.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1) ||
          (f.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1));
      }
      if (this.state.classType) {
        console.log(this.state.classType)
        result = result.filter(f => f.courseType === parseInt(this.state.classType));
      }
      if (!this.state.activeCourse) {
        result = result.filter(f => f.isActive === this.state.activeCourse);
      }
    }
    this.setState({
      filterResult: result
    });
  };

  render() {
    return (
      <>
        <Header></Header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 sidebar">
              <Navigation></Navigation>
            </div>
            <div className="col-md-10">

              <div className="row">
                <div className="col-md-8">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing-default">FILTER</span>
                    </div>
                    <input name="searchTerm" type="text" value={this.state.searchTerm} onChange={this.handleChange} />

                    <select value={this.state.classType} name="classType" onChange={this.handleChange} className="btn btn-outline-secondary dropdown-toggle">
                      <option value="all" className="dropdown-item">-Course Type-</option>
                      <option value="1" className="dropdown-item">Undergraduate</option>
                      <option value="2" className="dropdown-item">Graduate</option>
                      <option value="3" className="dropdown-item">Certificate</option>
                      <option value="4" className="dropdown-item">Mixed</option>

                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group-append">
                    <button onClick={this.resetFilter} type="submit">Reset</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label>
                    Active Courses Only:
                            <input
                      name="activeCourse"
                      type="checkbox"
                      defaultChecked={this.state.activeCourse}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="col-md-9">

                </div>

              </div>


              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filterResult.map(crs =>
                    <tr>
                      <th scope="row" key={crs.courseId}>{crs.courseCode}</th>
                      <td>{crs.name} </td>
                      <td>{crs.courseTypesId} </td>
                      <td><button type="button" className="btn btn-outline-primary">Edit</button>
                        <button type="button" className="btn btn-outline-danger">Delete</button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default Course;