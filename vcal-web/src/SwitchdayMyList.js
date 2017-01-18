import React, { Component } from 'react';
import reqwest from 'reqwest';
import SwitchMyDate from './SwitchMyDate';

class SwitchdayMyList extends Component {
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
      tillTime="1600" isHalfDay="0" isWorkday="0" isAlreadySwitched="false"/>
    );
    const workdays = this.state.myWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.work_date} fromTime={s.from_time_in_24hours}
      tillTime={s.to_time_in_24hours} isHalfDay={s.is_half_day}  isWorkday="1"
      isAlreadySwitched="false"/>
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

export default SwitchdayMyList;
