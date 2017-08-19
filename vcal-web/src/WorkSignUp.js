import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import { Link } from 'react-router';
import MyDatePicker from './CustomCalendar';
import {getHumanDate, isNonWorkingDay, makeId, isFutureDate} from './Utility';
import Feedback from './Feedback';

class WorkSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myWorkday: [], myStandin: [], openWorkday: [], openStandin: [],
            openSwitchWorkday: [], openSwitchStandin: [], mySwitchday: [],
            dictOpenWorkdayMetadata: new Map(), dictOpenStandinMetadata: new Map(),
            openWorkdayDates: new Map(), openStandinDates: new Map(),
            ruleSet: {"standin": [0, 0, 0], "workday": [0, 0, 0]}, childrenCount: 0,
            feedbackMessage: "", displayAlert: false
        };

        this.getStandinRule = this.getStandinRule.bind(this);
        this.getWorkdayRule = this.getWorkdayRule.bind(this);
        this.refreshDates = this.refreshDates.bind(this);
        this.appendToDictOfDatesStandin = this.appendToDictOfDatesStandin.bind(this);
        this.appendToDictOfDatesWorkday = this.appendToDictOfDatesWorkday.bind(this);
        this.appendSwitchDaysToDictOfDatesStandin = this.appendSwitchDaysToDictOfDatesStandin.bind(this);
        this.appendSwitchDaysToDictOfDatesWorkday = this.appendSwitchDaysToDictOfDatesWorkday.bind(this);
        this.getRule = this.getRule.bind(this);
    }

    refreshDates() {
        this.getMyWorkday();
        this.getMyStandin();
        this.getOpenWorkday();
        this.getOpenStandin();
        this.getOpenSwitchStandin();
        this.getOpenSwitchWorkday();
        this.getMySwitchday();
    }

    componentDidMount() {
        this.getRule();
        this.refreshDates();

        this.setState({childrenCount: localStorage.getItem("childrenCount")});

    }

    isMySwitchDay(chosenDate) {
//var self = this;
        var mySwitchDates = this.state.mySwitchday.map((x) => x.switch_date
    )
        ;
        for (var i = 0; i < mySwitchDates.length; i++) {
            if (chosenDate === mySwitchDates[i]) {
                return true;
            }
        }
        return false;
    }

    onUpdate(displayAlert, message) {
        // popup message
        this.setState({displayAlert: displayAlert, feedbackMessage: message});

        //this.refreshDates();
    }

    getRule() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        var termId = localStorage.getItem("termId");

// todo: get list of terms for given group id
        reqwest({
            url: conf.serverUrl + '/rule/' + groupId + '/term/' + termId + '/'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , success: function (resp) {
                if (Object.keys(resp).length === 0 && resp.constructor === Object) {
                    return 0;
                }

                self.setState({ruleSet: JSON.parse(resp.definition)});
            }
        });
    }

    getMySwitchday() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        reqwest({
            url: conf.serverUrl + '/switchday/' + groupId + '/user/' + userId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({mySwitchday: resp});
            }
        });
    }

    getStandinRule() {
        return this.state.ruleSet.standin[this.state.childrenCount - 1];
    }

    getWorkdayRule() {
        return this.state.ruleSet.workday[this.state.childrenCount - 1];
    }

    getOpenWorkday() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/openworkday/' + groupId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({openWorkday: resp});
                self.appendToDictOfDatesWorkday(resp);
            }
        });
    }

    getOpenStandin() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/openstandin/' + groupId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({openStandin: resp});
                self.appendToDictOfDatesStandin(resp);
            }
        });
    }

    getOpenSwitchWorkday() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/switchday/' + groupId + '/type/1/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({openSwitchWorkday: resp});
                self.appendSwitchDaysToDictOfDatesWorkday(resp);
            }
        });
    }

    getOpenSwitchStandin() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/switchday/' + groupId + '/type/0/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({openSwitchStandin: resp});
                self.appendSwitchDaysToDictOfDatesStandin(resp);
            }
        });
    }

    getMyWorkday() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        reqwest({
            url: conf.serverUrl + '/myworkday/' + groupId + '/user/' + userId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({myWorkday: resp});
            }
        });
    }

    getMyStandin() {
        var self = this;
        var groupId = localStorage.getItem("groupId");
        var userId = localStorage.getItem("userId");
        reqwest({
            url: conf.serverUrl + '/mystandin/' + groupId + '/user/' + userId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({myStandin: resp});
            }
        });
    }

    isListedAsSwitchDay(dt) {
        return true;
    }

    isInChosenTerm(date) {
        var termId = localStorage.getItem("termId");
        var terms = JSON.parse(localStorage.getItem("allTerms"));
        var f = (terms.find(x => x.id === termId)
    )
        ;
        if (f) {
            if (date >= f.start_date && date <= f.end_date) {
                return true;
            }
        }
        return false;
    }

    getDef(isWorkday, isSwitchDay, isHalfDay, from, to, switchUserId) {
        function isHalfDayText(isHalfDay) {
            var text = "Full-day";
            if (isHalfDay) {
                text = "Half-day";
            }
            return text;
        };

        var o = new Map;
        o.set("exists", true);
        o.set("isSwitchDay", isSwitchDay);
        o.set("isHalfDay", isHalfDay);
        o.set("existingSwitchUserId", switchUserId);
        if (isWorkday) {
            o.set("displayText", isHalfDayText(isHalfDay) + ' from '
                + from + ' till ' + to);
        }
        else {
            o.set("displayText", 'Full-day from 0830 till 1630.');
        }
        return o;
    }

    getText(isWorkday, isHalfDay, from, to) {
        function isHalfDayText(isHalfDay) {
            var text = "Full-day";
            if (isHalfDay) {
                text = "Half-day";
            }
            return text;
        };

        if (isWorkday) {
            return isHalfDayText(isHalfDay) + ' from '
                + from + ' till ' + to;
        }
        else {
            return 'Full-day from 0830 till 1630';
        }
    }

    appendToDictOfDatesStandin(response_array) {
        var self = this;
        // this function returns a dictionary of key=standin_date timestamp and a value=0
        response_array
            .filter(function (s) {
                return self.isInChosenTerm(s.standin_date);
            })
            .map(
                (i) => (
            this.state.dictOpenStandinMetadata.set(
                i.standin_date,
                this.getDef(false, false, null, null, null, null))))
            .map((i) => (this.state.openStandinDates.set(i.standin_date, 1)))
        ;
    }

    appendToDictOfDatesWorkday(response_array) {
        var self = this;
        // this function returns a dictionary of key=work_date timestamp and a value=1
        response_array
            .filter(function (s) {
                return self.isInChosenTerm(s.work_date);
            })
            .map((i) => (
            this.state.dictOpenWorkdayMetadata.set(i.work_date,
                this.getDef(true, false, i.is_half_day, i.from_time_in_24hours, i.to_time_in_24hours, null))))
        .map((i) => (this.state.openWorkdayDates.set(i.work_date, 1)))
        ;
    }

    appendSwitchDaysToDictOfDatesStandin(response_array) {
        var self = this;
        // this function appends to existing
        response_array
            .filter(function (s) {
                return self.isInChosenTerm(s.switch_date);
            })
            .map((i) => (this.state.dictOpenStandinMetadata.set(i.switch_date,
            this.getDef(false, true, null, null, null, i.standin_user_id)))
    )
        ;
    }

    appendSwitchDaysToDictOfDatesWorkday(response_array) {
        var self = this;
        // this function appends to existing
        response_array
            .filter(function (s) {
                return self.isInChosenTerm(s.switch_date);
            })
            .map((i) => (this.state.dictOpenWorkdayMetadata.set(i.switch_date,
            this.getDef(true, true, i.is_half_day, i.from_time_in_24hours, i.to_time_in_24hours, i.standin_user_id)))
    )
        ;
    }

    render() {
        var self = this;
        // days already selected by user
        const standins = this.state.myStandin;
        const standinElements = standins
                .filter(function (s) {
                    return self.isInChosenTerm(s.standin_date);
                })
                .filter(function (s) {
                    return !isNonWorkingDay(s.standin_date);
                })
                .filter(function (s) {
                    return isFutureDate(s.standin_date);
                })
                .map((s) =>
            < MyDatePicker
        key = {s.standin_date + s.id
    }
        chosenDate = {s.standin_date
    }
        openDatesMetadata = {this.state.dictOpenStandinMetadata
    }
        openDates = {this.state.openStandinDates
    }
        isWorkday = {false}
        signupId = {s.id
    }
        onUpdate = {this.onUpdate.bind(this)
    }
        isHalfDay = {false}
        isSwitchDay = {this.isMySwitchDay(s.standin_date)
    }
        displayText = {this.getText(false, false, s.from_time_in_24hours, s.to_time_in_24hours)
    }/>
    )
        ;

        const workdays = this.state.myWorkday;
        const workdayElements = workdays
                .filter(function (s) {
                    return self.isInChosenTerm(s.work_date);
                })
                .filter(function (s) {
                    return !isNonWorkingDay(s.work_date);
                })
                .filter(function (s) {
                    return isFutureDate(s.work_date);
                })
                .map((s) =>
            < MyDatePicker
        key = {s.work_date + s.id
    }
        chosenDate = {s.work_date
    }
        openDatesMetadata = {this.state.dictOpenWorkdayMetadata
    }
        openDates = {this.state.openWorkdayDates
    }
        isWorkday = {true}
        signupId = {s.id
    }
        onUpdate = {this.onUpdate.bind(this)
    }
        isHalfDay = {s.is_half_day
    }
        isSwitchDay = {this.isMySwitchDay(s.work_date)
    }
        displayText = {this.getText(true, s.is_half_day, s.from_time_in_24hours, s.to_time_in_24hours, null)
    }/>
    )
        ;

        //create new date columns based on rule set
        const range = n =>
        Array.from({length: n}, (value, key) => key)
        ;

        var n = this.getStandinRule() - standinElements.length;
        const standinRange = range(n);

        var y = this.getWorkdayRule() - workdayElements.length;
        const workdayRange = range(y);

        const standinFromRule = standinRange
                .map((s) =>
            < MyDatePicker
        key = {'standin' +s}
        openDatesMetadata = {this.state.dictOpenStandinMetadata
    }
        isWorkday = {false}
        signupId = {null}
        isHalfDay = {false}
        isSwitchDay = {false}
        onUpdate = {this.onUpdate.bind(this)
    }
        displayText = "" / >
    )
        ;
        const workdayFromRule = workdayRange
                .map((s) =>
            < MyDatePicker
        key = {'workday' +s}
        openDatesMetadata = {this.state.dictOpenWorkdayMetadata
    }
        isWorkday = {true}
        signupId = {null}
        isHalfDay = {false}
        isSwitchDay = {false}
        onUpdate = {this.onUpdate.bind(this)
    }
        displayText = "" / >
    )
        ;


        return (
            < div >
            < Header / >
            < h1 > Åtagande < / h1 >
            < h4 > Fyll
        i
        datum
        nedan
        för
        att
        uppfylla
        ditt
        åtagande < / h4 >
        < Feedback
        displayAlert = {this.state.displayAlert
    }
        message = {this.state.feedbackMessage
    } />

    <
        div
        className = "panel panel-default" >
            < div
        className = "panel-heading" > Vikariedagar < / div >
            < div
        className = "panel-body" >
            < div
        className = "list-group" >
            {standinElements}
        {
            standinFromRule
        }
    </
        div >
        < / div >
        < / div >

        < div
        className = "panel panel-default" >
            < div
        className = "panel-heading" > Arbetsdagar < / div >
            < div
        className = "panel-body" >
            < div
        className = "list-group" >
            {workdayElements}
        {
            workdayFromRule
        }
    </
        div >
        < / div >
        < / div >
        < / div >
    )
        ;
    }
}

export default WorkSignUp;
