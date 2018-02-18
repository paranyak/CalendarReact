import React from "react";
import ReactDOM from 'react-dom';

import {DateTime} from 'luxon'
import {splitEvery} from 'ramda';

import "./styles/tmp.less"


let CURRENT_DATE = new Date();
let CURRENT_YEAR = CURRENT_DATE.getFullYear();
let CURRENT_MONTH = CURRENT_DATE.getMonth();
const MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];


const generateCalendarModel = (day, startDay = 0) => {
    const DAYS_AT_THE_WEEK = 7;
    const date = DateTime.fromJSDate(day);
    const numberOfDays = date.daysInMonth;

    let weekday = (DAYS_AT_THE_WEEK - (startDay - date.set({day: 1}).weekday)) % DAYS_AT_THE_WEEK;
    // let weekday = date.set({day: 1}).weekday -1;



    return splitEvery(DAYS_AT_THE_WEEK)
    ([
        ...Array(weekday).fill(), // "Prefix array"
        ...Array(numberOfDays).fill().map((el, i) => i + 1) // Calendar
    ])
};


class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {
            calendarModel: generateCalendarModel(new Date(new Date().setMonth(CURRENT_MONTH)), 1),
            month: MONTHS[CURRENT_MONTH],
            year: CURRENT_YEAR
        };
    }

    changeVariables(){
        CURRENT_MONTH = CURRENT_DATE.getMonth();
        CURRENT_YEAR = CURRENT_DATE.getFullYear();
        this.setState({calendarModel: generateCalendarModel(CURRENT_DATE, 1)});
        this.setState({year: CURRENT_YEAR});
        this.setState({month: MONTHS[CURRENT_MONTH]});
        // console.log(CURRENT_DATE);
    }

    handlePrev() {
        CURRENT_DATE = new Date(CURRENT_DATE.setMonth(CURRENT_MONTH - 1));
        this.changeVariables();
    }

    handleNext() {
        CURRENT_DATE = new Date(CURRENT_DATE.setMonth(CURRENT_MONTH + 1));
        this.changeVariables();
    }

    render() {
        let calendarWeekNames = (<div class="week week_days">
                <span class="day day_name">MON</span>
                <span class="day day_name">TUE</span>
                <span class="day day_name">WED</span>
                <span class="day day_name">THU</span>
                <span class="day day_name">FRI</span>
                <span class="day day_name">SAT</span>
                <span class="day day_name">SUN</span>
            </div>);
        let calendarTemplate = (this.state.calendarModel.map(row =>
            <div className="week week_calendar">{row.map(day => <time
                className="day day_calendar">{day || ""}</time>)}</div>
            ) );
        let calendarHeader = ( <div className="options">
            <button className="buttons" onClick={(e) => this.handlePrev(e)}>
                <div className="option option_prev">Previous month</div>
            </button>
            <div className="calendar-detail">
                <p className="option option_month">{this.state.month}</p>
                <p className="option option_year">{this.state.year}</p>
            </div>
            <button className="buttons" onClick={(e) => this.handleNext(e)}>
                <div className="option option_next">Next month</div>
            </button>
        </div>);
        return (<div> {calendarWeekNames} <div className="calendar">{calendarTemplate}</div> {calendarHeader}</div>);
    }
}

ReactDOM.render(
    <div>
        <Calendar/>
    </div>,
    document.querySelector('#root')
);




