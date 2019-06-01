import React from "react";
import "../styles/filter.css";

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            classType: "",
            activeCourse: true

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChange(event) {
        this.setState({ classType: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    filterCourses(){
        
    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">FILTER</span>
                            </div>
                            <input name="searchTerm" type="text" value={this.state.searchTerm} onChange={this.handleInputChange} />

                            <select value={this.state.classType} onChange={this.handleChange} className="btn btn-outline-secondary dropdown-toggle">
                                <option value="all" className="dropdown-item">-Course Type-</option>
                                <option value="undergraduate" className="dropdown-item">Undergraduate</option>
                                <option value="graduate" className="dropdown-item">Graduate</option>
                                <option value="certificate" className="dropdown-item">Certificate</option>
                                <option value="mixed" className="dropdown-item">Mixed</option>

                            </select>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="input-group-append">
                            <form ref="form" onSubmit={this.handleSubmit}>
                                <button type="submit">Do the thing</button>
                            </form>
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
                                checked={this.state.activeCourse}
                                onChange={this.handleInputChange} />

                        </label>
                    </div>
                    <div className="col-md-9">

                    </div>

                </div>

            </>
        );
    }
}

export default Filter;