import React from "react";
import ReactDOM from 'react-dom';

import {DateTime} from 'luxon'
import {splitEvery} from 'ramda';

let CURRENT_DATE = new Date();
let CURRENT_YEAR = CURRENT_DATE.getFullYear();
let CURRENT_MONTH = CURRENT_DATE.getMonth();
let MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];


const generateCalendarModel = (day, startDay = 0) => {
    const DAYS_AT_THE_WEEK = 7;
    const date = DateTime.fromJSDate(day);
    const numberOfDays = date.daysInMonth;

    let weekday = (DAYS_AT_THE_WEEK - (startDay - date.set({day: 1}).weekday)) % DAYS_AT_THE_WEEK;

    return splitEvery(DAYS_AT_THE_WEEK)
    ([
        ...Array(weekday).fill(), // "Prefix array"
        ...Array(numberOfDays).fill().map((el, i) => i + 1) // Calendar
    ])
};


class Calendar extends React.Component{
    constructor(){
    super();
    this.state={
        calendarModel: generateCalendarModel(new Date(new Date().setMonth(CURRENT_MONTH)), 1),
        month:"FEBRUARY",
        year: CURRENT_YEAR
    };
    }


    handlePrev() {
        //DOESN'T WORKwebpack
        CURRENT_DATE = new Date(CURRENT_DATE.setMonth(CURRENT_MONTH-1));
        CURRENT_MONTH = CURRENT_DATE.getMonth();
        CURRENT_YEAR = CURRENT_DATE.getFullYear();
        this.setState({calendarModel :generateCalendarModel(CURRENT_DATE, 1)});
        this.setState({year:CURRENT_YEAR});
        this.setState({month:MONTHS[CURRENT_MONTH]});
        console.log(CURRENT_DATE);
    }

    handleNext() {
        //DOESN'T WORKwebpack
        CURRENT_DATE = new Date(CURRENT_DATE.setMonth(CURRENT_MONTH+1));
        CURRENT_MONTH = CURRENT_DATE.getMonth();
        CURRENT_YEAR = CURRENT_DATE.getFullYear();
        this.setState({calendarModel :generateCalendarModel(CURRENT_DATE, 1)});
        this.setState({year:CURRENT_YEAR});
        this.setState({month:MONTHS[CURRENT_MONTH]});
        console.log(CURRENT_DATE);
    }

    render(){
        let calendarTemplate = (this.state.calendarModel.map(row =>
            <div className="week week_calendar">{row.map(day => <span className="day day_calendar">{day || ""}</span>)}</div>
    ));
        let options = ( <div className="options">
            <button className="option__buttons" onClick={(e) => this.handlePrev(e)}><div className="option option_prev">Previous month </div></button>
        <div className="calendar_detail">
            <p className="option option_month">{this.state.month}</p>
        <p className="option option_year">{this.state.year}</p>
        </div>
        <button  className="option__buttons" onClick={(e) => this.handleNext(e)}> <div className="option option_next">Next month</div></button>
        </div>);
        return ( <div> {calendarTemplate}  {options}</div>);
    }
}
//
// class Button  extends React.Component{
//     constructor(){
//         super();
//         this.state={
//             month:"FEBRUARY",
//             year: CURRENT_YEAR
//         };
//     }
//
//     handlePrev() {
//         //DOESN'T WORKwebpack
//         const calendar = new Calendar();
//         CURRENT_DATE = new Date(new Date().setMonth(CURRENT_MONTH-1));
//         calendar.setState({calendarModel :generateCalendarModel(CURRENT_DATE, 1)});
//         console.log(calendar.state.calendarModel);
//         }
//
//
//     render(){
//
//         let options = (<div className="options">
//             <button className="option__buttons"> <div className="option option_prev" onClick={(e) => this.handlePrev(e)}>Previous month </div></button>
//         <div className="calendar_detail">
//             <p className="option option_month">{this.state.month}</p>
//         <p className="option option_year">{this.state.year}</p>
//         </div>
//         <button  className="option__buttons"> <div className="option option_next">Next month</div></button>
//         </div>);
//
//             return  (options);
//     }
// }


ReactDOM.render(
    <div>
<Calendar />
</div>,
    document.querySelector('.calendar')
);




