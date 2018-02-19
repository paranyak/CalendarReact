import React from "react";
import Calendar from "./Calendar";

import "../styles/calendar-option.less"
import "../styles/calendar-header.less"
import  "../styles/common.less"

let CURRENT_DATE = new Date();
let CURRENT_YEAR = CURRENT_DATE.getFullYear();
let CURRENT_MONTH = CURRENT_DATE.getMonth();
const MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];



class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            currentDate: CURRENT_DATE,
            month: MONTHS[CURRENT_MONTH],
            year: CURRENT_YEAR
        };
    }

    changeVariables(){
        this.state.currentDate = CURRENT_DATE;
        CURRENT_MONTH = CURRENT_DATE.getMonth();
        CURRENT_YEAR = CURRENT_DATE.getFullYear();
        this.setState({year: CURRENT_YEAR});
        this.setState({month: MONTHS[CURRENT_MONTH]});
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
        let calendarTemplate = <Calendar date={this.state.currentDate}/>;

        let calendarHeader = ( <div className="calendar-header">
            <button className="calendar-option calendar-option_buttons" onClick={(e) => this.handlePrev(e)}>
                <div className="calendar-option calendar-option_prev">Previous month</div>
            </button>
            <div className="calendar-option calendar-option_detail">
                <p className="calendar-option calendar-option_month">{this.state.month}</p>
                <p className="calendar-option calendar-option_year">{this.state.year}</p>
            </div>
            <button className="calendar-option calendar-option_buttons" onClick={(e) => this.handleNext(e)}>
                <div className="calendar-option calendar-option_next">Next month</div>
            </button>
        </div>);
        return (<div>{calendarTemplate} {calendarHeader}</div>);
    }
}


export default Header;
