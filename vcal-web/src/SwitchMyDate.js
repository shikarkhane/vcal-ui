import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {makeId}from './Utility';

class SwitchMyDate extends Component{
  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.state = {disabled: false};
  }
  handleSwitch(pIsWorkday, chosenDate, fromTime, tillTime, pIsHalfDay){
    this.setState({disabled: true });
    var self = this;
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = pIsWorkday;
    var isHalfDay = pIsHalfDay;

    var jsonBody = { switch_date: chosenDate, standin_user_id: userId,
      id: makeId() };
    if ( isWorkday){
      jsonBody = { work_date: chosenDate, standin_user_id: userId,
        from_time_in_24hours: fromTime, to_time_in_24hours: tillTime,
        is_half_day: isHalfDay, id: makeId() };
    }

      reqwest({
          url: conf.serverUrl + '/switchday/' + groupId + '/user/' + userId + '/'
        , type: 'json'
        , method: 'post'
        , contentType: 'application/json'
        , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
            is_workday: isWorkday, from_time: fromTime, to_time: tillTime,
          is_half_day: isHalfDay})
        , success: function (resp) {
            //console.log(resp);
            self.props.onSwitch(jsonBody, isWorkday);
          }
      });

  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    var displayDate = this.props.displayDate;
    var fromTime = this.props.fromTime;
    var tillTime = this.props.tillTime;
    var isHalfDay = this.props.isHalfDay;
    var isAlreadySwitched = this.props.isAlreadySwitched;
    var halfDayText = "full day";
    var disabled = this.state.disabled;
    var classSpecial = "alert " + (isAlreadySwitched ? false: "alert-success");

    if ( isAlreadySwitched){
      disabled = true;
    }
    if ( isHalfDay ) {
      halfDayText = "half day";
    }
    if(isWorkday){
      return (
        <div className={classSpecial} role="alert">
          {displayDate} between
            {fromTime} till {tillTime} for ({halfDayText})

          <button type="button" className="btn btn-success pull-right"
            onClick={this.handleSwitch.bind(null, isWorkday, chosenDate, fromTime,
              tillTime, isHalfDay)} disabled={disabled}>
            <span className="glyphicon glyphicon-transfer" aria-hidden="true"></span>
          </button>
        </div>
      );
    }
    else{
      return (
        <div className={classSpecial} role="alert">
        {displayDate}
        <button type="button" className="btn btn-success pull-right"
          onClick={this.handleSwitch.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay)} disabled={disabled}>
          <span className="glyphicon glyphicon-transfer" aria-hidden="true"></span>
        </button>
      </div>
    );
    }

  }
}


export default SwitchMyDate;
