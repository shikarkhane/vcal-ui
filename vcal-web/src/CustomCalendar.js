import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import {isNonWorkingDay, isFutureDate, isWith30DaysFromNow} from './Utility';

class MyDatePicker extends Component {
    constructor(props) {
        super(props);

        var chosenDate = null;
        var displayText = "Choose a date!";
        var disabledByte = true;

        var byteButtonClass = "btn";
        var visibleByte = "hidden";

        if (this.props.chosenDate) {
            chosenDate = moment(Number(this.props.chosenDate) * 1000);
            displayText = this.props.displayText;
            disabledByte = false;
            byteButtonClass = "btn btn-success";
            visibleByte = "visible";
        }
        if (this.props.isSwitchDay) {
            disabledByte = true;

            byteButtonClass = "btn btn-warning";
            visibleByte = "visible";
        }

        this.state = {
            date: chosenDate, signupId: this.props.signupId,
            displayText: displayText, disabledByte: disabledByte,
            byteButtonClass: byteButtonClass, switchId: this.props.switchId,
            byteText: 'Byte', visibleByte: visibleByte
        };

        this.isDayBlocked = this.isDayBlocked.bind(this);
        this.highlightHalfDay = this.highlightHalfDay.bind(this);
        this.showText = this.showText.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDeleteSignup = this.handleDeleteSignup.bind(this);
        this.handleSwitchDate = this.handleSwitchDate.bind(this);
    }

    calendarInfo() {
        return "Halvdagar är gulmarkerade";
    }

    highlightHalfDay(day) {
        var epoch = (day.clone()).utc().startOf('day').unix();
        if (this.props.openDatesMetadata.get(epoch)) {
            if ((this.props.openDatesMetadata.get(epoch).get('isHalfDay') === true) &&
                (!isNonWorkingDay(epoch)) &&
                (isFutureDate(epoch))
            ) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    componentWillReceiveProps() {
        if (this.props.chosenDate) {
            this.setState({
                disabledByte: false,
                byteText: "Byte",
                byteButtonClass: "btn btn-success"
            });
        }

        if (this.props.isSwitchDay) {
            this.setState({
                disabledByte: true,
                byteText: "Byte publicerat",
                byteButtonClass: "btn btn-warning"
            });
        }
    }

    clearText() {
        this.setState({displayText: "Choose a date!"});
    }

    handleSwitchDate() {
        this.setState({
            disabledByte: true, byteText: "Byte publicerat",
            byteButtonClass: "btn btn-warning"
        });
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        var isWorkday = this.props.isWorkday;
        var isHalfDay = this.props.isHalfDay;
        var chosenDate = (this.state.date.clone()).utc().startOf('day').unix();

        reqwest({
            url: conf.serverUrl + '/switchday/' + groupId + '/user/' + userId + '/'
            , type: 'json'
            , method: 'post'
            , contentType: 'application/json'
            , data: JSON.stringify({
                chosen_date: chosenDate, user_id: userId,
                is_workday: isWorkday, from_time: "na", to_time: "na",
                is_half_day: isHalfDay
            })
            , success: function (resp) {
                //console.log(resp);
                if (resp.status === 'ok') {
                    console.log(resp.id);
                    //this.setState({switchId: resp.id});
                }

            }
        });

    }

    showText(epoch) {
        if (this.props.openDatesMetadata.get(epoch)) {
            if ((this.props.openDatesMetadata.get(epoch).get('exists') === true) &&
                (!isNonWorkingDay(epoch)) &&
                (isFutureDate(epoch))
            ) {
                this.setState({displayText: this.props.openDatesMetadata.get(epoch).get('displayText')});
                console.log(epoch);

            }
        }
    }

    isDayBlocked(day) {
        var epoch = (day.clone()).utc().startOf('day').unix();

        if ((this.props.openDates.get(epoch)) &&
            (!isNonWorkingDay(epoch)) &&
            (isFutureDate(epoch))
        ) {
            return false;
        }
        else {
            return true;
        }
    }

    handleDeleteSignup() {
        var self = this;
        var isWorkday = this.props.isWorkday;
        var signupId = this.state.signupId;
        var switchId = this.state.switchId;

        if (isWorkday) {
            reqwest({
                url: conf.serverUrl + '/workday/' + signupId + '/'
                , type: 'json'
                , method: 'put'
                , contentType: 'application/json'
                , success: function (resp) {
                    //console.log(resp);
                    self.props.onFeedbackUpdate(true, "Deleted");
                }
            });
        }
        else {
            reqwest({
                url: conf.serverUrl + '/standinday/' + signupId + '/'
                , type: 'json'
                , method: 'put'
                , contentType: 'application/json'
                , success: function (resp) {
                    //console.log(resp);
                    self.props.onFeedbackUpdate(true, "Deleted");
                }
            });
        }

        if (this.props.isSwitchDay) {
            //todo add serverside api and call here to delete switchday
            console.log("delete switch day based on switch id");
            reqwest({
                url: conf.serverUrl + '/switchday/' + switchId + '/'
                , type: 'json'
                , method: 'delete'
                , contentType: 'application/json'
                , success: function (resp) {
                    if (resp.status === 'ok') {
                        console.log('switch day was unpublished');
                    }

                }
            });
        }

    }

    handleSwitchDaySave(chosenDate, standinUserId) {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        var isWorkday = this.props.isWorkday;

        reqwest({
            url: conf.serverUrl + '/on-switch-work-sign-up/' + groupId + "/"
            , type: 'json'
            , method: 'post'
            , contentType: 'application/json'
            , data: JSON.stringify({
                chosen_date: chosenDate, user_id: userId,
                is_workday: isWorkday, standinUserId: standinUserId
            })
            , error: function (err) {
                self.props.onFeedbackUpdate(true, "Error!");
                self.clearText();
            }
            , success: function (resp) {
                if (resp.status === 'ok') {
                    self.props.onFeedbackUpdate(true, "Saved");
                }
                else{
                    self.props.onFeedbackUpdate(true, "Error!");
                    self.clearText();
                }

            }
        });
        reqwest({
            url: conf.serverUrl + '/switchday/' + groupId + '/standinuser/' + standinUserId + '/'
            , type: 'json'
            , method: 'delete'
            , contentType: 'application/json'
            , data: JSON.stringify({chosen_date: chosenDate})
            , error: function (err) {
                self.props.onFeedbackUpdate(true, "Error!");
            }
            , success: function (resp) {
                console.log(resp);
                if (resp.status === 'ok') {
                    self.props.onOpenDatesUpdate(chosenDate, false, isWorkday);
                }
            }
        });

    }

    handleSave(date) {
        var self = this;

        //todo : handle a already published switch when given date gets deleted.
        // when clear date is clicked
        if (date === null) {
            var deletedDate = (this.state.date.clone()).utc().startOf('day').unix();
            if (!isWith30DaysFromNow(deletedDate)) {
                self.setState({visibleByte: "hidden"});
                this.handleDeleteSignup();
                self.props.onOpenDatesUpdate(deletedDate, true, self.props.isWorkday);
                this.clearText();
                return true;
            }
            else {
                self.props.onFeedbackUpdate(true, "Endast byte är möjligt eftersom datumet är inom 30 dagar");
                return false;
            }

        }
        else {
            if (this.state.date) {
                // if user chose another date while there exists a date in the date-picker
                var overwrittenDate = (this.state.date.clone()).utc().startOf('day').unix();
                if (!isWith30DaysFromNow(overwrittenDate)) {
                    this.handleDeleteSignup();
                    self.props.onOpenDatesUpdate(overwrittenDate, true, self.props.isWorkday);
                }
                else {
                    self.props.onFeedbackUpdate(true, "Endast byte är möjligt eftersom datumet är inom 30 dagar");
                    return false;
                }
            }

            this.setState({
                disabledByte: false, visibleByte: "visible", byteText: "Byte",
                byteButtonClass: "btn btn-success"
            });

            var groupId = localStorage.getItem("groupId");
            var userId = localStorage.getItem("userId");
            var isWorkday = this.props.isWorkday;
            var chosenDate = (date.clone()).utc().startOf('day').unix();

            this.showText(chosenDate);

            var t = this.props.openDatesMetadata.get(chosenDate);
            // if it was a switch day, handle it differently
            if (t.get('isSwitchDay') === true) {
                self.handleSwitchDaySave(chosenDate, t.get('existingSwitchUserId'));
            }
            else {
                reqwest({
                    url: conf.serverUrl + '/work-sign-up/' + groupId + "/"
                    , type: 'json'
                    , method: 'post'
                    , contentType: 'application/json'
                    , data: JSON.stringify({
                        chosen_date: chosenDate, user_id: userId,
                        is_workday: isWorkday
                    })
                    , error: function (err) {
                        self.props.onFeedbackUpdate(true, "Error!");
                    }
                    , success: function (resp) {
                        //console.log(resp);
                        if (resp.status === 'ok') {
                            self.setState({signupId: resp.id});
                            self.props.onFeedbackUpdate(true, "Saved");
                            self.props.onOpenDatesUpdate(chosenDate, false, isWorkday);
                        }
                        else{
                            self.props.onFeedbackUpdate(true, "Error!");
                        }
                    }
                });
            }

            return true;
        }
    }

    render() {
        const visibilityStyle = { visibility: this.state.visibleByte};

        return (
            <li className="list-group-item" >
                < SingleDatePicker date={this.state.date} focused={this.state.focused}
                    disabled={this.props.disabled}
                    onDateChange={(date) =>
                            {
                                // clear the date if its not within 30 days
                                if (this.handleSave(date)) {
                                    this.setState({date});
                                }
                            }
                        }
                    onFocusChange={({focused}) =>
                            {
                                this.setState({focused});
                            }
                        }
                    showClearDate={!this.props.disabled}
                    displayFormat="MMM D"
                    isDayBlocked={this.isDayBlocked}
                    renderCalendarInfo={this.calendarInfo}
                    isDayHighlighted={this.highlightHalfDay}
                    numberOfMonths={1}
                />
                <button type="button" className={this.state.byteButtonClass}
                    onClick={this.handleSwitchDate} disabled={this.state.disabledByte || this.props.disabled}
                    style={visibilityStyle} >

                        {this.state.byteText}
                </button >

                <span className="badge" > {this.state.displayText}</span >
            </li>
        )
    }
}

export default MyDatePicker;