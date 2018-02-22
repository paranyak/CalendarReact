import React from "react";
import Calendar from "./Calendar";

import "../styles/option.less"
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
        this.setState({currentDate :CURRENT_DATE});
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
            <button className="option option_buttons" onClick={(e) => this.handlePrev(e)}>
                <div className="option__prev">Previous month</div>
            </button>
            <div className="option option_detail">
                <p className="option__month">{this.state.month}</p>
                <p className="option__year">{this.state.year}</p>
            </div>
            <button className="option option_buttons" onClick={(e) => this.handleNext(e)}>
                <div className="option__next">Next month</div>
            </button>
        </div>);
        return (<div>{calendarTemplate} {calendarHeader}</div>);
    }
}


export default Header;
