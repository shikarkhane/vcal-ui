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

    var result = '';

    if(Boolean(isWorkday)){
      return (<div className="input-group">
        <input type="checkbox" className="form-control" data-pick-date="{this.props.chosenDate}"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate, fromTime, tillTime, isHalfDay)}/>
        <span className="input-group-addon" >{this.props.chosenDate} between
          {fromTime}
          till  {tillTime}
          ( half-day={isHalfDay} )</span>
      </div>);
    }
    else{
      return (<div className="input-group">
        <input type="checkbox" className="form-control" data-pick-date="{this.props.chosenDate}"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate, fromTime, tillTime, isHalfDay)}/>
        <span className="input-group-addon" >{this.props.chosenDate}</span>
      </div>);
    }

  }
}


export default SwitchMyDate;
