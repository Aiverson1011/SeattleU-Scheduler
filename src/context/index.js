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
            refreshCourses: this.refreshCourses,
            validate: this.validate

        };
    }
    componentDidMount = async (props, state) => {

        let searchParams = new URLSearchParams(window.location.search)
        let schedulesId = searchParams.get("id") || 1;

        // ALL our courses
        const courses = await superagent.get("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/courses");
        // ALL our instructors
        const instructors = await superagent.get("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/instructors");
        // yearly schedule
        const masterSchedule = await superagent.get("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/blockSchedule").query({ schedulesId: schedulesId });
        let scheduleName = Object.keys(masterSchedule.body)[0] || "";
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
        // fromTimeslotMap.set(course.id, this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].id);
        let assigned = [
            ...this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].assigned, course
        ]
        let scheduleCopy = { ...this.state.masterSchedule };
        scheduleCopy[scheduleName].quarters[activeQuarter].days[day].times[time].assigned = assigned;

        let masterSchedule = Object.assign({}, this.state.masterSchedule, scheduleCopy);
        let newCourse = JSON.stringify({
            "scheduleItemsId": course.id,
            "TimeslotsIdFrom": -1,
            "TimeslotsIdTo": this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].id,
        })

        // "scheduleItems":{
        //     "id": course.id,
        //     "quarterSchedulesId": course.quarterSchedulesId,
        //     "coursesId": course.coursesId,
        //     "instructorsId": course.instructorsId,
        //     "capacity": course.capacity,
        //     "isMaster": course.isMaster,
        //     "section": course.section,
        // }

        // post to save (call save item to save the 
        this.setState({
            masterSchedule,
        })
        this.saveSchedule(newCourse);

    }

    saveSchedule = (item) => {

        superagent
            .post("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/calender/quarter")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(item) 
            .then(data => {
               console.log("I SAVED");
            })
    };

    validate = async() =>
    {
        // getScheduleForWarning
        const validation = await superagent.get("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/getScheduleForWarning");

    }

    changeQuarter = async (activeQuarter) => {

        let qtrId = this.state.quarters[activeQuarter].id;
        const result = await superagent.get("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/selectScheduleItemsByQuarterSchedulesId")
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
        // allows the ability to refresh the courses when adding to the courses set
        const courses = await superagent.get("http://ec2-34-221-227-30.us-west-2.compute.amazonaws.com:3000/courses");
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

        let item = JSON.stringify({
            "scheduleItemsId": course.id,
            "TimeslotsIdFrom": this.state.masterSchedule[scheduleName].quarters[activeQuarter].days[day].times[time].id,
            "TimeslotsIdTo": -1,
        });
        this.saveSchedule(item)
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