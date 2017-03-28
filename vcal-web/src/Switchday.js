import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import SwitchdayMyList from './SwitchdayMyList';
import SwitchdayOpenList from './SwitchdayOpenList';
import Header from './Header';

class Switchday extends Component {
  constructor(props) {
   super(props);
   this.state = { myWorkday:[], myStandin:[], openWorkday:[], openStandin:[],
     mySwitchday:[]};
 }

 componentDidMount() {
     this.getMyWorkday();
     this.getMyStandin();
    this.getOpenSwitchWorkday();
    this.getOpenSwitchStandin();
    this.getMySwitchday();
  }
  onSwitch(newElement, isWorkday){
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
      var _data
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
    return (
      <div >
        <Header />
        <h1>Switch day</h1>
            <h5>You can offer a date to be exchanged by pressing the green button.</h5>
          <h5>Untill someone else picks your date, you are still responsible standin for that date.</h5>
        <SwitchdayMyList mySwitchday={this.state.mySwitchday}
          myStandin={this.state.myStandin}
          myWorkday={this.state.myWorkday} onSwitch={this.onSwitch.bind(this)}/>
        <SwitchdayOpenList openStandin={this.state.openStandin}
          openWorkday={this.state.openWorkday}  onTake={this.onTake.bind(this)}/>
      </div>
    );
  }
}

export default Switchday;
