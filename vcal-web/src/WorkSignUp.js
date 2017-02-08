import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import WorkSignUpComponent from './WorkSignUpComponent';
import WorkSignUpSummary from './WorkSignUpSummary';
import Header from './Header';

class WorkSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { myWorkday:[], myStandin:[], openWorkday: [], openStandin: []};
  }
  componentDidMount() {
    this.getMyWorkday();
    this.getMyStandin();
    this.getOpenWorkday();
    this.getOpenStandin();
  }
  onRemove(newElement, isWorkday){
    var _data;
    if ( isWorkday){
      _data = this.state.openWorkday;
      _data.unshift(newElement);
      this.setState({ openWorkday : _data});
    }
    else {
      _data = this.state.openStandin;
      _data.unshift(newElement);
      this.setState({ openStandin : _data});
    }
  }
  onTake(newElement, isWorkday){
    var _data;
    if ( isWorkday){
      _data = this.state.myWorkday;
      _data.unshift(newElement);
      this.setState({ myWorkday : _data});
    }
    else {
      _data = this.state.myStandin;
      _data.unshift(newElement);
      this.setState({ myStandin : _data});
    }
  }

  getOpenWorkday(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    reqwest({
      url: conf.serverUrl + '/openworkday/' + groupId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
        self.setState({openWorkday: resp});
      }
    });
  }
  getOpenStandin(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    reqwest({
      url: conf.serverUrl + '/openstandin/' + groupId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
        self.setState({openStandin: resp});
      }
    });
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
    return (
      <div >
        <Header />
        <h1>WorkSignUp</h1>
        <WorkSignUpSummary myStandin={this.state.myStandin}
    myWorkday={this.state.myWorkday} onRemove={this.onRemove.bind(this)}/>
        <WorkSignUpComponent openStandin={this.state.openStandin}
    openWorkday={this.state.openWorkday}  onTake={this.onTake.bind(this)}/>
      </div>
    );
  }
}

export default WorkSignUp;
