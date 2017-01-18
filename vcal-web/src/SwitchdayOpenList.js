import React, { Component } from 'react';
import reqwest from 'reqwest';
import SwitchMyDate from './SwitchMyDate';

class SwitchdayOpenList extends Component {
  constructor(props) {
   super(props);
   this.state = { openWorkday:[], openStandin:[], mySwitchday:[]};
 }
 componentDidMount() {
      this.getOpenSwitchWorkday();
      this.getOpenSwitchStandin();
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
  getOpenSwitchWorkday(){
    var self = this;
    var groupId = 1;
    reqwest({
        url: 'http://localhost:8080/switchday/' + groupId + '/type/1/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({openWorkday: resp});
        }
    });
  }
  getOpenSwitchStandin(){
    var self = this;
    var groupId = 1;
    reqwest({
        url: 'http://localhost:8080/switchday/' + groupId + '/type/0/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({openStandin: resp});
        }
    });
  }
  render() {
    const standins = this.state.openStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.switch_date} fromTime="0800"
      tillTime="1600" isHalfDay="0" isWorkday="0" isAlreadySwitched="false"/>
    );
    const workdays = this.state.openWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.switch_date} fromTime={s.from_time_in_24hours}
      tillTime={s.to_time_in_24hours} isHalfDay={s.is_half_day}  isWorkday="1"
      isAlreadySwitched="false"/>
  );

    return (
      <div>
        <h4>Open standin dates</h4>
          {standinSwitches}
        <h4>Open workday dates</h4>
          {workdaySwitches}
      </div>
    );
  }
}

export default SwitchdayOpenList;
