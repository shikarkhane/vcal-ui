import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {makeId}from './Utility';

class SwitchTakeDate extends Component{
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {disabled: false};
  }
  handleSave(pIsWorkday, chosenDate, fromTime, tillTime, pIsHalfDay,
    standinUserId, dbId){
    this.setState({disabled: true });
    var self = this;
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = pIsWorkday;
    var isHalfDay = pIsHalfDay;


    var jsonBody = { standin_date: chosenDate, standin_user_id: userId,
      id: makeId() };
    if ( isWorkday){
      jsonBody = { work_date: chosenDate, standin_user_id: userId,
        from_time_in_24hours: fromTime, to_time_in_24hours: tillTime,
        is_half_day: isHalfDay, id: makeId() };
    }

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
            jsonBody.id = dbId;
            self.props.onTake(jsonBody, isWorkday);
          }

        }
      });

  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    var displayDate = this.props.displayDate;
    var isChosen = "list-group-item " + (this.state.disabled ? 'list-group-item-success' : '');
    var fromTime = this.props.fromTime;
    var tillTime = this.props.tillTime;
    var isHalfDay = this.props.isHalfDay;
    var standinUserId = this.props.standinUserId;
    var halfDayText = "full day";
    var dbId = this.props.dbId;

    if ( isHalfDay ){
      halfDayText = "half day";
    }
    if(isWorkday){
      return (
        <button type="button" className={isChosen}
          onClick={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay, standinUserId, dbId)} disabled={this.state.disabled}>
          {displayDate} between
            {fromTime} till {tillTime} for ({halfDayText})
        </button>
      );
    }
    else{
      return (
        <button type="button" className={isChosen}
          onClick={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay, standinUserId, dbId)} disabled={this.state.disabled}>
          {displayDate}
        </button>
    );
    }

  }
}


export default SwitchTakeDate;
