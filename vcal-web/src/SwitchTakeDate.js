import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class SwitchTakeDate extends Component{
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {disabled: false};
  }
  handleSave(pIsWorkday, chosenDate, fromTime, tillTime, pIsHalfDay,
    fromOpenList, standinUserId){
    this.setState({disabled: true });
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = pIsWorkday;
    var isHalfDay = pIsHalfDay;

    //if switch is from open list, delete switchday and assign workday/standin
    //to this user
    if ( fromOpenList ){
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
          console.log(resp);
        }
      });
    }
    else{
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
          }
      });
    }
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    var displayDate = this.props.displayDate;
    var isChosen = "list-group-item " + (this.state.disabled ? 'list-group-item-success' : '');
    var fromTime = this.props.fromTime;
    var tillTime = this.props.tillTime;
    var isHalfDay = this.props.isHalfDay;
    var fromOpenList= this.props.fromOpenList;
    var standinUserId = this.props.standinUserId;
    var halfDayText = "full day";

    if ( isHalfDay ){
      halfDayText = "half day";
    }
    if(isWorkday){
      return (
        <button type="button" className={isChosen}
          onClick={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay, fromOpenList, standinUserId)} disabled={this.state.disabled}>
          {displayDate} between
            {fromTime} till {tillTime} for ({halfDayText})
        </button>
      );
    }
    else{
      return (
        <button type="button" className={isChosen}
          onClick={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay, fromOpenList, standinUserId)} disabled={this.state.disabled}>
          {displayDate}
        </button>
    );
    }

  }
}


export default SwitchTakeDate;
