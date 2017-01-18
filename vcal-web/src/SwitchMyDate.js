import React, { Component } from 'react';
import reqwest from 'reqwest';

class SwitchMyDate extends Component{
  handleSave(isWorkday, chosenDate, fromTime, tillTime, isHalfDay){
    var group_id = 1;
    var chosen_date = chosenDate;
    var user_id = 1;
    var is_workday = Boolean(isWorkday);
    var is_half_day = Boolean(isHalfDay);

    reqwest({
        url: 'http://localhost:8080/switchday/' + group_id + '/user/' + user_id + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ chosen_date: chosen_date, user_id: user_id,
          is_workday: is_workday, from_time: fromTime, to_time: tillTime,
        is_half_day: is_half_day})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    var fromTime = this.props.fromTime;
    var tillTime = this.props.tillTime;
    var isHalfDay = this.props.isHalfDay;
    var isAlreadySwitched = Boolean(this.props.isAlreadySwitched);

    var result = '';

    if(Boolean(isWorkday)){
      return (<div >
        <input type="checkbox"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate, fromTime, tillTime, isHalfDay)}
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
           onChange={this.handleSave.bind(null, isWorkday, chosenDate, fromTime, tillTime, isHalfDay)}
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
