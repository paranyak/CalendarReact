import React from "react";
import ReactDOM from 'react-dom';

import {DateTime} from 'luxon'
import {splitEvery} from 'ramda';

let CURRENT_DATE = new Date();
let CURRENT_YEAR = CURRENT_DATE.getFullYear();
let CURRENT_MONTH = CURRENT_DATE.getMonth();


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
    };
    }


    render(){
    console.log("Here");
        return (this.state.calendarModel.map(row =>
        <div className="week week_calendar">{row.map(day => <span className="day day_calendar">{day || ""}</span>)}</div>
    ));
    }
}

class Button  extends React.Component{
    constructor(){
        super();
        this.state={
            month:"FEBRUARY",
            year: CURRENT_YEAR
        };
    }

    handlePrev() {
        //DOESN'T WORK
        const calendar = new Calendar();
        CURRENT_DATE = new Date(new Date().setMonth(CURRENT_MONTH-1));
        calendar.setState({calendarModel :generateCalendarModel(CURRENT_DATE, 1)});
        console.log(calendar.state.calendarModel);
        }


    render(){
            return  <div className="options">
            <button className="option__buttons"> <div className="option option_prev" onClick={(e) => this.handlePrev(e)}>Previous month </div></button>
        <div className="calendar_detail">
            <p className="option option_month">{this.state.month}</p>
            <p className="option option_year">{this.state.year}</p>
            </div>
            <button  className="option__buttons"> <div className="option option_next">Next month</div></button>
        </div>
    }
}


ReactDOM.render(
    <div>
<Calendar />
<Button />
</div>,
    document.querySelector('.calendar')
);




