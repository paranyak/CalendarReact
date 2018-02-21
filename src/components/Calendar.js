import React from "react";

import {DateTime} from 'luxon'
import {splitEvery} from 'ramda';

import "../styles/day.less"
import "../styles/week.less"


const generateCalendarModel = (day) => {
    const DAYS_AT_THE_WEEK = 7;
    const date = DateTime.fromJSDate(day);
    const numberOfDays = date.daysInMonth;

    let weekday = date.set({day: 1}).weekday -1;
    return splitEvery(DAYS_AT_THE_WEEK)
    ([
        ...Array(weekday).fill(), // "Prefix array"
        ...Array(numberOfDays).fill().map((el, i) => i + 1) // Calendar
    ])
};


class Calendar extends React.Component {

    render() {
        let calendarWeekNames = (<div className="week week_days">
            <span className="day day_name">MON</span>
            <span className="day day_name">TUE</span>
            <span className="day day_name">WED</span>
            <span className="day day_name">THU</span>
            <span className="day day_name">FRI</span>
            <span className="day day_name">SAT</span>
            <span className="day day_name">SUN</span>
        </div>);
        let calendarTemplate = (generateCalendarModel(this.props.date).map(row =>
            <div className="week week_calendar">{row.map(day => <time
                className="day day_calendar">{day || ""}</time>)}</div>
        ) );
        return (<div>{calendarWeekNames} <div className="calendar"> {calendarTemplate}</div></div>);
    }
}


export default Calendar;
