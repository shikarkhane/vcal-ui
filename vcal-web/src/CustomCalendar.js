import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import {getHumanDate, isNonWorkingDay, makeId, isFutureDate} from './Utility';

class MyDatePicker extends Component{
    constructor(props) {
        super(props);

        var chosenDate = null;
        if ( this.props.chosenDate ){
            chosenDate = moment(Number(this.props.chosenDate)*1000);
        }
        this.state = { date: chosenDate};
        this.isDayBlocked = this.isDayBlocked.bind(this);
    }
    isDayBlocked(day){
        var epoch = (day.clone()).utc().startOf('day').unix();
        if( (this.props.openDates.get(epoch) == 1) &&
            (!isNonWorkingDay(epoch)) &&
            (isFutureDate(epoch))
        ){
            return false;
        }
        else{
            return true;
        }
    }
    handleSave(date){
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        var isWorkday = this.props.isWorkday;
        var chosenDate = (date.clone()).utc().startOf('day').unix();

        reqwest({
            url: conf.serverUrl + '/work-sign-up/' + groupId + "/"
            , type: 'json'
            , method: 'post'
            , contentType: 'application/json'
            , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
                is_workday: isWorkday})
            , success: function (resp) {
                //console.log(resp);
                if (resp.status === 'ok'){
                    console.log(resp);
                }
            }
        });
    }
    render(){
        return(
            <SingleDatePicker
        date={this.state.date}
        focused={this.state.focused}
        onDateChange={(date) => {
            this.setState({ date });
            this.handleSave(date);
        }}
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