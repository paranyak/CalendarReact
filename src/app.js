import React from "react";
import ReactDOM from 'react-dom';

import {DateTime} from 'luxon'
import {splitEvery} from 'ramda';

let CURRENT_MONTH = new Date().getMonth();


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
        calendarModel: generateCalendarModel(new Date(new Date().setMonth(CURRENT_MONTH)), 1)
    };
    }

    render(){
        return (this.state.calendarModel.map(row =>
        <div className="week week_calendar">{row.map(day => <span className="day day_calendar">{day || ""}</span>)}</div>
    ));
    }
}

ReactDOM.render(
    <Calendar/>,
    document.querySelector('.calendar')
);

