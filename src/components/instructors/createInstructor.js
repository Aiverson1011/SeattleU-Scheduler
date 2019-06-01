import React from "react";
import "../../styles/header.css"
import Header from "../../layout/header.js";
import Navigation from "../../layout/navigation.js";

class CreateInstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            instructorType: "",
            isActive: true
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

      handleChange(event) {
        const value = event.target.value;
        this.setState({ [event.target.name]: value });
      } 
    
      handleSubmit(event) {
        event.preventDefault();
        let result = JSON.stringify(
            {
                "instructorId":0,
                "firstName": this.state.firstName,
                "lastName":this.state.lastName,
                "email":this.state.email,
                "instructorType": this.state.instructorType,
                "isActive":this.state.isActive
            }
        )
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
                                    <div className="form-group col-md-3">
                                        <label for="firstName">First Name</label>
                                        <input type="text" className="form-control" name="firstName" 
                                        id="firstName" placeholder="First Name" onChange={this.handleChange} required />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label for="lastName">Last Name</label>
                                        <input type="text" className="form-control" name="lastName" 
                                        id="lastName" placeholder="Last Name" onChange={this.handleChange} required />
                                    </div>


                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="email">Email</label>
                                        <input type="email" className="form-control" name="email" 
                                        id="email" placeholder="email" onChange={this.handleChange} required />
                                    </div>
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Instructor Type</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} type="radio" name="instructorType" id="1" value="1"
                                                />
                                                <label className="form-check-label" for="gridRadios1">
                                                    Tenure-Track
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" onChange={this.handleChange} type="radio" name="instructorType" id="2" value="2" />
                                                <label className="form-check-label" for="gridRadios2">
                                                    Instructor
                                        </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="form-group row">
                                    <div className="col-sm-2">Active Instructor</div>
                                    <div className="col-sm-10">
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={this.handleChange} defaultChecked="true" type="checkbox" id="gridCheck1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        <button type="submit" className="btn btn-primary">Create Instructor</button>
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

export default CreateInstructor;