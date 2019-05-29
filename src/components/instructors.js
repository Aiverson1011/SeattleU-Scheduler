import React from "react";
import "../styles/header.css";
import Navigation from "../layout/navigation.js";
import Header from "../layout/header.js";
import { UniversityContext } from "../context/index.js";

class Instructors extends React.Component {

    static contextType = UniversityContext;
    constructor(props) {
        super(props);

        this.state = {
            filterResult: [],
            firstName: "",
            lastName: "",
            instructorType: "",
            isActive: true,
            searchTerm: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        this.setState({
            filterResult: this.context.instructors
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
        this.setState({ searchTerm: '', instructorType: 'all', isActive: true, filterResult: this.context.instructors });
    }

    filterCourses = () => {
        var result = this.context.instructors;
        console.log("hello");
        if ((this.state.searchTerm === "") && (this.state.instructorType === "" || this.state.instructorType === "all")) {
            result = result.filter(f => f.isActive === this.state.isActive);
        } else {
            if (this.state.searchTerm) {
                result = result.filter(f => (f.firstName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1) ||
                    (f.lastName.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1));
            }
            if (this.state.instructorType) {
                result = result.filter(f => f.instructorType === parseInt(this.state.instructorType));
            }
            if (!this.state.isActive) {
                result = result.filter(f => f.isActive === this.state.isActive);
            }
        }
        console.log(result);
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

                                        <select value={this.state.instructorType} name="instructorType"
                                            onChange={this.handleChange} className="btn btn-outline-secondary dropdown-toggle">
                                            <option value="all" className="dropdown-item">-Instructor Type-</option>
                                            <option value="1" className="dropdown-item">Tenure-Track</option>
                                            <option value="2" className="dropdown-item">Instructor</option>


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
                                        Active Instructors Only:
                            <input
                                            name="isActive"
                                            type="checkbox"
                                            defaultChecked={this.state.isActive}
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
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Instructor Type</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filterResult.map(inst =>
                                        <tr>
                                            <th scope="row" key={inst.instructorId}>{inst.firstName}</th>
                                            <td>{inst.lastName} </td>
                                            <td>{inst.instructorType} </td>
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

export default Instructors;