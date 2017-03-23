import React, { Component } from 'react';

import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class MyDatePicker extends Component{
    constructor(props) {
        super(props);

        var chosenDate = null;
        if ( this.props.chosenDate ){
            chosenDate = moment(this.props.chosenDate);
        }
        this.state = { date: chosenDate};
        this.isDayBlocked = this.isDayBlocked.bind(this);
    }
    isDayBlocked(day){
        if( this.props.openDates.get((day.clone()).utc().startOf('day').unix()) == 1 ){
            return false;
        }
        else{
            return true;
        }
    }
    render(){
        return(
            <SingleDatePicker
        date={this.state.date}
        focused={this.state.focused}
        onDateChange={(date) => { this.setState({ date }); }}
        onFocusChange={({ focused }) => { this.setState({ focused }); }}
        showClearDate
        reopenPickerOnClearDate
        displayFormat="MMM D"
        isDayBlocked={this.isDayBlocked}
        />

        )
    }
}

export default MyDatePicker;