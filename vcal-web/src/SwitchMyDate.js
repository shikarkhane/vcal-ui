import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class SwitchMyDate extends Component{
  handleSave(pIsWorkday, chosenDate, fromTime, tillTime, pIsHalfDay,
    fromOpenList){
    var groupId = localStorage.getItem("groupId");
    var userId = 1;
    var isWorkday = Boolean(pIsWorkday);
    var isHalfDay = Boolean(pIsHalfDay);

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
    var chosenDate = this.props.chosenDate;
    var fromTime = this.props.fromTime;
    var tillTime = this.props.tillTime;
    var isHalfDay = this.props.isHalfDay;
    var isAlreadySwitched = Boolean(this.props.isAlreadySwitched);
    var fromOpenList=Boolean(this.props.fromOpenList);

    if(Boolean(isWorkday)){
      return (<div >
        <input type="checkbox"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
             tillTime, isHalfDay, fromOpenList)}
           checked={isAlreadySwitched}/>
        <span >{this.props.chosenDate} between
          {fromTime}
          till  {tillTime}
          ( half-day={isHalfDay} )</span>
      </div>);
    }
    else{
      return (<div >
        <input type="checkbox"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate, fromTime,
             tillTime, isHalfDay, fromOpenList)}
           checked={isAlreadySwitched}/>
        <span >{this.props.chosenDate} between
          {fromTime}
          till  {tillTime}
          ( half-day={isHalfDay} )</span>
      </div>);
    }

  }
}


export default SwitchMyDate;
