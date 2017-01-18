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
        url: 'http://localhost:8080/switchday/' + group_id + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ switch_date: chosen_date, user_id: user_id,
          is_workday: is_workday, from_time: fromTime, to_time: tillTime})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    var fromTime = this.props.from_time_in_24hours;
    var tillTime = this.props.to_time_in_24hours;
    var isHalfDay = this.props.is_half_day;

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
class SwitchdayComponent extends Component {
  constructor(props) {
   super(props);
   this.state = { myWorkday:[], myStandin:[], mySwitchday:[]};
 }
 componentDidMount() {
      this.getMyWorkday();
      this.getMyStandin();
      this.getMySwitchday();
  }
  getMySwitchday(){
    var self = this;
    var groupId = 1;
    var userId = 1;
    reqwest({
        url: 'http://localhost:8080/switchday/' + groupId  + '/user/' + userId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({mySwitchday: resp});
        }
    });
  }
  getMyWorkday(){
    var self = this;
    var groupId = 1;
    var userId = 1;
    reqwest({
        url: 'http://localhost:8080/myworkday/' + groupId + '/user/' + userId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({myWorkday: resp});
        }
    });
  }
  getMyStandin(){
    var self = this;
    var groupId = 1;
    var userId = 1;
    reqwest({
        url: 'http://localhost:8080/mystandin/' + groupId + '/user/' + userId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({myStandin: resp});
        }
    });
  }
  render() {
    const standins = this.state.myStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.standin_date} fromTime="0800"
      tillTime="1600" isHalfDay="0" isWorkday="0"/>
    );
    const workdays = this.state.myWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.work_date} fromTime={s.from_time_in_24hours}
      tillTime={s.to_time_in_24hours} isHalfDay={s.is_half_day}  isWorkday="1" />
  );

    return (
      <div>
        <h4>You standin dates</h4>
          {standinSwitches}
        <h4>You workday dates</h4>
          {workdaySwitches}
      </div>
    );
  }
}

export default SwitchdayComponent;
