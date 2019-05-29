import React from "react";
import "../styles/header.css";
import Header from "../layout/header.js";
import Navigation from "../layout/navigation.js";
import superagent from "superagent";

class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: "",
            courseCode: "",
            credits: "",
            workUnits: "",
            courseType: "",
            activeCourse: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    // handleSubmit(event) {
    //     event.preventDefault();

    //     // fetch('/api/form-submit-url', {
    //     //   method: 'POST',
    //     //   body: data,
    //     // });
    //   }

    saveCourse = (result) => {
        superagent
            .post("http://localhost:3000/courses")
            .send(result);
    };

    handleChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let result = JSON.stringify(
            {
                "courseId": 0,
                "courseCode": this.state.courseCode,
                "courseName": this.state.courseName,
                "credits": this.state.credits,
                "workUnits": this.state.workUnits,
                "courseType": this.state.courseType,
                "isActive": this.state.activeCourse
            }
        )
        console.log(result);
        this.saveCourse(result);
    }

    render() {
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 sidebar">
                            <Navigation></Navigation>
                        </div>
                        <div className="col-md-10">

                            <form className="courseForm" onSubmit={this.handleSubmit}>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="courseName">Course Name</label>
                                        <input type="text" className="form-control" name="courseName"
                                            id="courseName" placeholder="Course Name" onChange={this.handleChange} required />
                                    </div>


                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label for="courseCode">Course Code</label>
                                        <input type="text" className="form-control" name="courseCode"
                                            id="courseCode" placeholder="Course code" onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label for="credits">Credits</label>
                                        <input type="text" className="form-control"
                                            name="credits" id="credits" placeholder="credits" onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label for="workUnits">Work Units</label>
                                        <input type="text" className="form-control"
                                            name="workUnits" id="workUnits" placeholder="work Units" onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Course Type</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} type="radio" name="courseType" id="1" value="1"
                                                />
                                                <label className="form-check-label" for="gridRadios1">
                                                    Undergraduate
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} type="radio" name="courseType" id="2" value="2" />
                                                <label className="form-check-label" for="gridRadios2">
                                                    Graduate
                                        </label>
                                            </div>
                                            <div className="form-check disabled">
                                                <input className="form-check-input" onChange={this.handleChange} type="radio" name="courseType" id="3" value="3" />
                                                <label className="form-check-label" for="gridRadios3">
                                                    Certificate
                                        </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} type="radio" name="courseType" id="4" value="4" />
                                                <label className="form-check-label" for="gridRadios2">
                                                    Mixed
                                        </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="form-group row">
                                    <div className="col-sm-2">Active Course</div>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={this.handleChange} defaultChecked="true" type="checkbox" id="gridCheck1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">Create Course</button>
                                    </div>
                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CreateCourse;