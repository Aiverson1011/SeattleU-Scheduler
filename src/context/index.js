import React from 'react';
import superagent from 'superagent';

export const CourseContext = React.createContext();

class CourseContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async (props, state) => {
        const courses = await superagent.get("http://localhost:3000/selectAllCourses");
        const instructors = await superagent.get("http://localhost:3000/selectAllInstructors");
        const schedule = await superagent.get("http://demo7986744.mockable.io/schedule");
        this.setState({
            courses: courses.body,
            instructors: instructors.body,
            schedule: schedule.body
        });
    };


    render() {
        return (
            <CourseContext.Provider value={this.state}>
                {(this.state.courses && this.state.instructors && this.state.schedule) ? this.props.children : null}
            </CourseContext.Provider>
        );
    }
}

export default CourseContextProvider;