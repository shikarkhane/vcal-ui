import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import {isNonWorkingDay, isFutureDate, isWith30DaysFromNow} from './Utility';

class MyDatePicker extends Component{
    constructor(props) {
        super(props);

        var chosenDate = null;
        if ( this.props.chosenDate ){
            chosenDate = moment(Number(this.props.chosenDate)*1000);
        }
        this.state = { date: chosenDate, signupId: this.props.signupId,
        displayText: ""};

        this.isDayBlocked = this.isDayBlocked.bind(this);
        this.showText = this.showText.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDeleteSignup = this.handleDeleteSignup.bind(this);
    }
    showText(day){
        var epoch = (day.clone()).utc().startOf('day').unix();
        if ( this.props.openDates.get(epoch) ){
            if( (this.props.openDates.get(epoch).get('exists') === true) &&
                (!isNonWorkingDay(epoch)) &&
                (isFutureDate(epoch))
            ){
                this.setState({displaytext: this.props.openDates.get(epoch).get('displayText') });
                //console.log(epoch);

            }
        }
    }
    isDayBlocked(day){
        var epoch = (day.clone()).utc().startOf('day').unix();
        if ( this.props.openDates.get(epoch) ){
            if( (this.props.openDates.get(epoch).get('exists') === true) &&
                (!isNonWorkingDay(epoch)) &&
                (isFutureDate(epoch))
            ){
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    }
    handleDeleteSignup(){
        var self = this;
        var isWorkday = this.props.isWorkday;
        var signupId = this.state.signupId;

        if (isWorkday){
            reqwest({
                url: conf.serverUrl + '/workday/' + signupId + '/'
                , type: 'json'
                , method: 'put'
                , contentType: 'application/json'
                , success: function (resp) {
                    //console.log(resp);
                    self.props.onUpdate(true, "Deleted");
                }
            });
        }
        else{
            reqwest({
                url: conf.serverUrl + '/standinday/' + signupId + '/'
                , type: 'json'
                , method: 'put'
                , contentType: 'application/json'
                , success: function (resp) {
                    //console.log(resp);
                    self.props.onUpdate(true, "Deleted");
                }
            });
        }

    }
    handleSwitchDaySave(chosenDate, standinUserId){
        var self = this;
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        var isWorkday = this.props.isWorkday;

        reqwest({
            url: conf.serverUrl + '/on-switch-work-sign-up/' + groupId + "/"
            , type: 'json'
            , method: 'post'
            , contentType: 'application/json'
            , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
                is_workday: isWorkday, standinUserId: standinUserId})
            , success: function (resp) {
                console.log(resp);
            }
        });
        reqwest({
            url: conf.serverUrl + '/switchday/' + groupId + '/standinuser/' + standinUserId + '/'
            , type: 'json'
            , method: 'delete'
            , contentType: 'application/json'
            , data: JSON.stringify({ chosen_date: chosenDate})
            , success: function (resp) {
                if (resp.status === 'ok'){
                    self.props.onUpdate(true, "Saved");
                }

            }
        });

    }

    handleSave(date){
        var self = this;

        // when clear date is clicked
        if ( date === null ){
            var deletedDate = (this.state.date.clone()).utc().startOf('day').unix();
            if ( ! isWith30DaysFromNow(deletedDate)){
                this.handleDeleteSignup();
                return true;
            }
            else{
                self.props.onUpdate(true, "Cannot delete a chosen date within 30 days. Only switch is allowed.");
                return false;
            }

        }
        else{
            if ( this.state.date ){
                // if user chose another date while there exists a date in the date-picker
                var deletedDate = (this.state.date.clone()).utc().startOf('day').unix();
                if ( ! isWith30DaysFromNow(deletedDate)){
                    this.handleDeleteSignup();
                }
                else{
                    self.props.onUpdate(true, "Cannot delete a chosen date within 30 days. Only switch is allowed.");
                    return false;
                }
            }

            var groupId = localStorage.getItem("groupId");
            var userId = localStorage.getItem("userId");
            var isWorkday = this.props.isWorkday;
            var chosenDate = (date.clone()).utc().startOf('day').unix();

            var t = this.props.openDates.get(chosenDate);
            // if it was a switch day, handle it differently
            if (t.get('isSwitchDay') === true){
                self.handleSwitchDaySave(chosenDate, t.get('existingSwitchUserId'));
            }
            else{
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
                            self.setState({signupId: resp.id});
                            self.props.onUpdate(true, "Saved");
                        }
                    }
                });
            }

            return true;
        }
    }
    render(){
        return(
            <li className="list-group-item">
                        <SingleDatePicker
                    date={this.state.date}
                    focused={this.state.focused}
                    onDateChange={(date) => {
                        // clear the date if its not within 30 days
                        if(this.handleSave(date)){
                            this.setState({ date });
                        }

                    }}
                    onFocusChange={({ focused }) => {this.setState({ focused });}}
                    showClearDate
                    displayFormat="MMM D"
                    isDayBlocked={this.isDayBlocked}
                    />
        {this.state.displayText}
        </li>

        )
    }
}

export default MyDatePicker;