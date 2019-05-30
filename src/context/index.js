import React from 'react';
import superagent from 'superagent';

export const UniversityContext = React.createContext();

class UniversityContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuarterCourses: [],
            assigned: [],
            schedulesId: 1,
            scheduleChanges: [],
            scheduleName: "",
            activeQuarter: "Fall",
            changeQuarter: this.changeQuarter,
            addToSchedule: this.addToSchedule,
            handleDelete: this.handleDelete,
            generateCoursesList: this.generateCoursesList,
            saveSchedule: this.saveSchedule,
            refreshCourses: this.refreshCourses

        };

    }
    componentDidMount = async (props, state) => {

        // read query from browser for scheduleID.

        let searchParams = new URLSearchParams(window.location.search)
        let schedulesId = searchParams.get("id") || 1;

        // ALL our courses
        const courses = await superagent.get("http://localhost:3000/courses");
        // ALL our instructors
        const instructors = await superagent.get("http://localhost:3000/selectAllInstructors");
        // yearly schedule
        const masterSchedule = await superagent.get("http://localhost:3000/blockSchedule").query({ schedulesId: schedulesId });
        let scheduleName = Object.keys(masterSchedule.body)[0] || "";
        console.log(scheduleName)
        this.setState({
            quarters: masterSchedule.body[scheduleName].quarters,
            courses: courses.body,
            instructors: instructors.body,
            masterSchedule: masterSchedule.body,
            quarterSchedule: {},
            usedCourses: {},
            schedulesId,
            scheduleName

        });

    };

    addToSchedule = (entry) => {

        let { course, day, time, activeQuarter, scheduleName } = entry;
        let assigned = [
            ...this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].assigned, course
        ]
        let scheduleCopy = { ...this.state.masterSchedule };
        scheduleCopy[scheduleName].quarters[activeQuarter].days[day].times[time].assigned = assigned;

        let masterSchedule = Object.assign({}, this.state.masterSchedule, scheduleCopy);
        let item = {
            scheduleItemsId: course.id,
            scheduleitemsimeslotFrom: -1,
            scheduleitemsimeslotTo: this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].id,
            scheduleItems: course
        }

        // post to save (call save item to save the single item)

        this.setState({
            masterSchedule, scheduleChanges: [...this.state.scheduleChanges, item]
        })
    }

    saveSchedule = (e) => {
        e.preventDefault();
        console.log(this.state.scheduleChanges);
        // post back to server
        // superagent
        // .post("https://demo8340031.mockable.io/schedule")
        // .send(this.state.schedule)
        // .then(data => {
        //   let schedule = data.body.schedule;
        //   this.setState({
        //     schedule
        //   });
        // });
    }

    changeQuarter = async (activeQuarter) => {

        let qtrId = this.state.quarters[activeQuarter].id;
        const result = await superagent.get("http://localhost:3000/selectScheduleItemsByQuarterSchedulesId")
            .query({ quarterScheduleId: qtrId });
        // all of the assigned courses for the "active" quarter
        const quarterSchedule = this.state.quarters[activeQuarter].days
        // Lefthand sidebar or courses
        const activeQuarterCourses = result.body;

        this.setState({
            activeQuarterCourses,
            activeQuarter,
            quarterSchedule
        })
    }

    refreshCourses = async () => {
        const courses = await superagent.get("http://localhost:3000/courses");
        this.setState({ courses: courses.body })
        return true;
    }

    generateCoursesList = () => {

        let schedule = { ...this.state.masterSchedule[this.state.scheduleName].quarters[this.state.activeQuarter].days };
        let assigned = new Map();
        Object.keys(schedule).forEach((day) => {
            Object.keys(schedule[day].times).forEach((timeSlot) => {
                schedule[day].times[timeSlot].assigned.forEach((course) => {
                    let count = assigned.get(course.id) || 0;
                    assigned.set(course.id, count + 1);

                })
            })
        })

        let list = this.state.activeQuarterCourses.filter(item => {
            return !assigned.has(item.id);
        })

        return list;

    }

    handleDelete = entry => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        let { course, day, time, activeQuarter, scheduleName } = entry;
        let assigned = this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].assigned.filter((item) => {
            return item.id !== course.id
        })

        let scheduleCopy = { ...this.state.masterSchedule };
        scheduleCopy[scheduleName].quarters[activeQuarter].days[day].times[time].assigned = assigned;
        let masterSchedule = Object.assign({}, this.state.maseterSchedule, scheduleCopy);

        let item = {
            scheduleItemsId: course.id,
            scheduleitemsimeslotFrom: -1,
            scheduleitemsimeslotTo: -1,
            scheduleItems: course
        }


        this.setState({
            masterSchedule, assigned, scheduleChanges: [...this.state.scheduleChanges, item]
        }
        )
    };

    render() {
        return (
            <UniversityContext.Provider value={this.state}>
                {(this.state.courses && this.state.instructors && this.state.masterSchedule) ? this.props.children : null}
            </UniversityContext.Provider>
        );
    }
}

export default UniversityContextProvider;