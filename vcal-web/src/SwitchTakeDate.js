import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class SwitchTakeDate extends Component{
  handleSave(pIsWorkday, chosenDate, fromTime, tillTime, pIsHalfDay,
    fromOpenList){
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = pIsWorkday;
    var isHalfDay = pIsHalfDay;

    //if switch is from open list, delete switchday and assign workday/standin
    //to this user
    if ( fromOpenList ){
      reqwest({
          url: conf.serverUrl + '/work-sign-up/' + groupId + "/"
        , type: 'json'
        , method: 'post'
        , contentType: 'application/json'
        , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
            is_workday: isWorkday, is_taken: true})
        , success: function (resp) {
            console.log(resp);
          }
      });
      reqwest({
          url: conf.serverUrl + '/switchday/' + groupId + '/user/' + userId + '/'
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
            console.log(resp);
          }
      });
    }
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = Math.floor(((new Date(this.props.chosenDate)).getTime())/1000);

    var fromTime = this.props.fromTime;
    var tillTime = this.props.tillTime;
    var isHalfDay = this.props.isHalfDay;
    var isAlreadySwitched = this.props.isAlreadySwitched;
    var fromOpenList= this.props.fromOpenList;
    var halfDayText = "full day";
    if ( isHalfDay ){
      halfDayText = "half day";
    }
    if(isWorkday){
      return (
        <button type="button" className="list-group-item"
          onClick={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay, fromOpenList)}>
          {this.props.chosenDate} between
            {fromTime} till {tillTime} for ({halfDayText})
        </button>
      );
    }
    else{
      return (
        <button type="button" className="list-group-item"
          onClick={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
            tillTime, isHalfDay, fromOpenList)}>
          {this.props.chosenDate}
        </button>
    );
    }

  }
}


export default SwitchTakeDate;
