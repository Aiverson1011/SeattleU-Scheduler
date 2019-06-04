import React from "react";
import superagent from 'superagent';
import Header from "../../layout/header.js";
import Navigation from "../../layout/navigation.js";
import queryString from 'query-string'

class UpdateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: 0,
            courseName: "",
            courseCode: "",
            credits: "",
            workUnits: "",
            courseTypesId: "",
            isActive: false,
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
        const values = queryString.parse(this.props.location.search)
        this.setState({ courseId: values.cid });

        const crs = await superagent
            .get("http://http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/course/" + values.cid);
        let course = crs.body
        this.setState({
            courseId: this.state.courseId,
            courseName: course.name,
            courseCode: course.courseCode,
            credits: course.credits,
            workUnits: course.workUnits,
            courseTypesId: course.courseTypesId,
            isActive: course.isActive,
        })



    }


    saveCourse = (result) => {
        superagent
            .put("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/course/" + this.state.courseId)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(result)
            .then(data => {
                let course = data.body;
            });

    };

    handleChange(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [event.target.name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let result = JSON.stringify(
            {
                "courseCode": this.state.courseCode,
                "courseTypesId": this.state.courseTypesId,
                "credits": this.state.credits,
                "id": this.state.courseId,
                "name": this.state.courseName,
                "isActive": this.state.isActive,
                "workUnits": this.state.workUnits
            }

        //    courseCode: "CPSC 1000"
        //    courseTypesId: 1
        //    credits: 2
        //    id: 1
        //    isActive: true
        //    name: "Introduction to Computer Science"
        //    workUnits: 2
        )
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
                                        <label htmlFor="courseName">Course Name</label>
                                        <input type="text" className="form-control" name="courseName"
                                            id="courseName" value={this.state.courseName} placeholder="Course Name" onChange={this.handleChange} />
                                    </div>


                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-2">
                                        <label htmlFor="courseCode">Course Code</label>
                                        <input type="text" className="form-control" name="courseCode"
                                            id="courseCode" value={this.state.courseCode} placeholder="Course code" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="credits">Credits</label>
                                        <input type="text" className="form-control"
                                            name="credits" value={this.state.credits} id="credits" placeholder="credits" onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label htmlFor="workUnits">Work Units</label>
                                        <input type="text" className="form-control"
                                            name="workUnits" id="workUnits" value={this.state.workUnits} placeholder="work Units" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Course Type</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} checked={parseInt(this.state.courseTypesId) === 1} type="radio" name="courseTypesId" id="1" value="1"
                                                />
                                                <label className="form-check-label" htmlFor="gridRadios1">
                                                    Undergraduate
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} checked={parseInt(this.state.courseTypesId) === 2} type="radio" name="courseTypesId" id="2" value="2" />
                                                <label className="form-check-label" htmlFor="gridRadios2">
                                                    Graduate
                                                </label>
                                            </div>
                                            <div className="form-check disabled">
                                                <input className="form-check-input" onChange={this.handleChange} checked={parseInt(this.state.courseTypesId) === 3} type="radio" name="courseTypesId" id="3" value="3" />
                                                <label className="form-check-label" htmlFor="gridRadios3">
                                                    Certificate
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} checked={parseInt(this.state.courseTypesId) === 4} type="radio" name="courseTypesId" id="4" value="4" />
                                                <label className="form-check-label" htmlFor="gridRadios2">
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
                                            <input className="form-check-input" checked={this.state.isActive} name="isActive" onChange={this.handleChange} type="checkbox" id="gridCheck1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">Update Course</button>
                                    </div>
                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default UpdateCourse;
