import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import SwitchTakeDate from './SwitchTakeDate';
import {getHumanDate}from './Utility';

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
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    reqwest({
        url: conf.serverUrl + '/switchday/' + groupId  + '/user/' + userId + '/'
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
    var groupId = localStorage.getItem("groupId");
    reqwest({
        url: conf.serverUrl + '/switchday/' + groupId + '/type/1/'
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
    var groupId = localStorage.getItem("groupId");
    reqwest({
        url: conf.serverUrl + '/switchday/' + groupId + '/type/0/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({openStandin: resp});
        }
    });
  }

  render() {
    // todo intersect with mySwitchday and exclude from open list
    const standins = this.state.openStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchTakeDate key={s.switch_date+s.id}
      chosenDate={s.switch_date} standinUserId={s.standin_user_id}
      displayDate={getHumanDate(s.switch_date)}
      fromTime="0800" tillTime="1600" isHalfDay={false}
      isWorkday={false} isAlreadySwitched={false}
      fromOpenList={true}/>
    );
    const workdays = this.state.openWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchTakeDate key={s.switch_date+s.id} chosenDate={s.switch_date} standinUserId={s.standin_user_id}
      displayDate={getHumanDate(s.switch_date)}
      fromTime={s.from_time_in_24hours} tillTime={s.to_time_in_24hours}
      isHalfDay={s.is_half_day}  isWorkday={true}
      isAlreadySwitched={false} fromOpenList={true}/>
  );

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Open standin dates</div>
          <div className="panel-body">
            <div className="list-group">
              {standinSwitches}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Open workday dates</div>
          <div className="panel-body">
            <div className="list-group">
              {workdaySwitches}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default SwitchdayOpenList;
