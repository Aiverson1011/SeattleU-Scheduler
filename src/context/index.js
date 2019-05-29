import React from 'react'; 
import superagent from 'superagent';
import { createUnionOrIntersectionTypeNode } from 'typescript';

export const UniversityContext = React.createContext();

class UniversityContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleCourses: [],
            assigned: [],
            refreshQuarter: this.refreshQuarter,
            addToSchedule: this.addToSchedule,
            handleDelete: this.handleDelete
        };
    }
    componentDidMount = async (props, state) => {
        // ALL our courses
        const courses = await superagent.get("http://localhost:3000/courses");
        // ALL our instructors
        const instructors = await superagent.get("http://localhost:3000/selectAllInstructors");
        // yearly schedule
        const schedule = await superagent.get("http://localhost:3000/blockSchedule?schedulesId=1");

        console.log("Schedul", schedule.body);
        this.setState({
            courses: courses.body,
            instructors: instructors.body,
            schedule: schedule.body
        });


    };

    addToSchedule = (entry) => {
        let { course, day, time, activeQuarter, scheduleName } = entry;
        let scheduleCourses = this.state.scheduleCourses.filter(item => item.id !== course.id)
        // // let scheduledCourses = this.state.assigned.includes(course.coursesId)
        //     ? this.state.assigned
        //     : [...this.state.assigned, course.CoursesId];
        let assigned = [
            ...this.state.schedule[scheduleName].quarters[activeQuarter].days[day].times[time].assigned, course
        ]
        let scheduleCopy = { ...this.state.schedule };
        scheduleCopy[scheduleName].quarters[activeQuarter].days[day].times[time].assigned = assigned;
        let schedule = Object.assign({}, this.state.schedule, scheduleCopy);
       
        this.setState({
            schedule, assigned, scheduleCourses
        })
    }

    refreshQuarter = async (qtrId) => {
        // All the courese for a specific quarter
        const result = await superagent.get("http://localhost:3000/selectScheduleItemsByQuarterSchedulesId").query({ quarterScheduleId: qtrId });
        const scheduleCourses = result.body;
        this.setState({
            scheduleCourses
        })

    }

    handleDelete = entry => {
        if (!window.confirm("Are you sure?")) {
          return;
        }
        console.log(entry);
        let { course, day, time, activeQuarter, scheduleName } = entry;
        let scheduleCourses = this.state.scheduleCourses.filter(item => item.id !== course.id)
       

        let assigned = this.state.schedule[scheduleName].quarters[activeQuarter].days[day].times[time].assigned.filter((item) => {
            console.log(item);
            return item.id !== course.id
        })
        
        let scheduleCopy = { ...this.state.schedule };
        scheduleCopy[scheduleName].quarters[activeQuarter].days[day].times[time].assigned = assigned;
        let schedule = Object.assign({}, this.state.schedule, scheduleCopy);
       
        this.setState({
            schedule, assigned, scheduleCourses
        })
      };

    render() {
        return (
            <UniversityContext.Provider value={this.state}>
                {(this.state.courses && this.state.instructors && this.state.schedule) ? this.props.children : null}
            </UniversityContext.Provider>
        );
    }
}

export default UniversityContextProvider;