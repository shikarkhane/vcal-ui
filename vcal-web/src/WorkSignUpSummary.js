import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class WorkSignUpSummary extends Component {
  constructor(props) {
   super(props);
   this.state = { myWorkday:[], myStandin:[]};
 }
 componentDidMount() {
      this.getMyWorkday();
      this.getMyStandin();
  }
  getMyWorkday(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    reqwest({
        url: conf.serverUrl + '/myworkday/' + groupId + '/user/' + userId + '/'
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
    var userId = localStorage.getItem("userId");
    reqwest({
        url: conf.serverUrl + '/mystandin/' + groupId + '/user/' + userId + '/'
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
    const standinLabels = standins.map((s) =>
    <label key={s.id}>{new Date(s.standin_date)}</label>
  );
  const workdays = this.state.myWorkday;
  const workdayLabels = workdays.map((s) =>
  <label key={s.id}>{new Date(s.work_date)} between  {s.from_time_in_24hours}
    till  {s.to_time_in_24hours} ( half-day={s.is_half_day} )</label>
);

    return (
      <div>
        <h4>You standin dates</h4>
          {standinLabels}
        <h4>you workday dates</h4>
          {workdayLabels}
      </div>
    );
  }
}

export default WorkSignUpSummary;
