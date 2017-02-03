import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import getHumanDate from './Utility';

class MySignUps extends Component{
    constructor(props) {
        super(props);
        this.handleDeleteSignup = this.handleDeleteSignup.bind(this);
        this.state = {disabled: false};
    }
  handleDeleteSignup(signupId, isWorkday){
      this.setState({disabled: true });
    if (isWorkday){
      reqwest({
          url: conf.serverUrl + '/workday/' + signupId + '/'
        , type: 'json'
        , method: 'put'
        , contentType: 'application/json'
        , success: function (resp) {
            console.log(resp);
          }
      });
    }
    else{
      reqwest({
          url: conf.serverUrl + '/standinday/' + signupId + '/'
        , type: 'json'
        , method: 'put'
        , contentType: 'application/json'
        , success: function (resp) {
            console.log(resp);
          }
      });
    }

  }
  render(){
    var signupId = this.props.signupId;
    var isWorkday = this.props.isWorkday;
    return (
      <div className="alert alert-success" role="alert">
        {this.props.textToDisplay}
          <button type="button" className="btn btn-warning pull-right" disabled={this.state.disabled}
              onClick={this.handleDeleteSignup.bind(null, signupId, isWorkday)} >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
      </div>
    );
  }
}
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
    <MySignUps key={s.id} textToDisplay={getHumanDate(s.standin_date)}
      isWorkday={false} signupId={s.id}/>
      );
      const workdays = this.state.myWorkday;
      const workdayLabels = workdays.map((s) =>
      <MySignUps key={s.id} textToDisplay={getHumanDate(s.work_date) + 'between'
        +  s.from_time_in_24hours + 'till' + s.to_time_in_24hours}
        isWorkday={true} signupId={s.id}/>
    );

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Your standin dates</div>
          <div className="panel-body">
            {standinLabels}
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Your workday dates</div>
          <div className="panel-body">
            {workdayLabels}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkSignUpSummary;
