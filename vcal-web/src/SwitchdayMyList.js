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
    var groupId = localStorage.getItem("groupId");
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
    var groupId = localStorage.getItem("groupId");
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
    var groupId = localStorage.getItem("groupId");
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
  markAlreadySwitched(chosenDate){
    //var self = this;
    var mySwitchDates = this.state.mySwitchday.map((x) => x.switch_date);
    for(var i = 0; i < mySwitchDates.length; i++) {
      if ( chosenDate === mySwitchDates[i]){
        return true;
      }
    }
    return false;
  }
  render() {

    // todo intersect with mySwitchday and mark check boxs
    const standins = this.state.myStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.standin_date} fromTime="0800"
      tillTime="1600" isHalfDay={false} isWorkday={false}
      isAlreadySwitched={s.is_already_switched} fromOpenList={false}/>
    );
    const workdays = this.state.myWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.work_date} fromTime={s.from_time_in_24hours}
      tillTime={s.to_time_in_24hours} isHalfDay={s.is_half_day}  isWorkday={true}
      isAlreadySwitched={s.is_already_switched} fromOpenList={false}/>
  );

    return (
      <div>
        <h4>Your standin dates</h4>
          {standinSwitches}
        <h4>Your workday dates</h4>
          {workdaySwitches}
      </div>
    );
  }
}

export default SwitchdayMyList;
