import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import {getHumanDate, isWeekend, getUserInfo} from './Utility';

class PickDate extends Component{
    render(){
        var user = getUserInfo(this.props.userId)
        if(user){
            return (
                <button type="button" className="list-group-item">
                {getHumanDate(this.props.chosenDate) + ' , ' + user.name}
                </button>
            );
        }
        else{
            return (
                <button type="button" className="list-group-item">
                {getHumanDate(this.props.chosenDate) + ' , Open' }
                </button>
        );
        }
    }
}

class Overview extends Component {
  constructor(props) {
   super(props);
   this.state = {openWorkday: [], openStandin: [],
   nonOpenWorkday: [], nonOpenStandin: []};
 }
 componentDidMount() {
      this.getOpenWorkday();
      this.getOpenStandin();
     this.getNonOpenWorkday();
     this.getNonOpenStandin();

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
    getNonOpenWorkday(){
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/nonopenworkday/' + groupId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({nonOpenWorkday: resp});
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
    getNonOpenStandin(){
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/nonopenstandin/' + groupId + '/'
            , type: 'json'
            , method: 'get'
            , contentType: 'application/json'
            , success: function (resp) {
                self.setState({nonOpenStandin: resp});
            }
        });
    }

  render() {
// let user uncheck a date, if its 30 days ahead

    const standins = this.state.openStandin;
    const standinElements = standins
            .filter(function(s) { return !isWeekend(s.standin_date); })
            .map((s) =>
    <PickDate key={s.standin_date+s.id} chosenDate={s.standin_date} isWorkday="0" userId="" />
      );
    const workdays = this.state.openWorkday;
    const workdayElements = workdays
            .filter(function(s) { return !isWeekend(s.work_date); })
            .map((s) =>
    <PickDate key={s.work_date+s.id} chosenDate={s.work_date} isWorkday="1" userId="" />
    );
      const nonstandins = this.state.nonOpenStandin;
      const nonStandinElements = nonstandins
              .filter(function(s) { return !isWeekend(s.standin_date); })
              .map((s) =>
          <PickDate key={s.standin_date+s.id} chosenDate={s.standin_date} isWorkday="0"
      userId={s.standin_user_id}/>
  );
      const nonworkdays = this.state.nonOpenWorkday;
      const nonWorkdayElements = nonworkdays
              .filter(function(s) { return !isWeekend(s.work_date); })
              .map((s) =>
          <PickDate key={s.work_date+s.id} chosenDate={s.work_date} isWorkday="1"
      userId={s.standin_user_id}/>
  );

      return (

            <div>
          <Header />
          <h1>Overview</h1>
              <div className="panel panel-default">
                <div className="panel-heading">Open standin dates</div>
                <div className="panel-body">
                  <div className="list-group">
                    {standinElements}
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">Open workday dates</div>
                <div className="panel-body">
                  <div className="list-group">
                    {workdayElements}
                  </div>
                </div>
              </div>
          <div className="panel panel-default">
          <div className="panel-heading">Booked standin dates</div>
              <div className="panel-body">
                  <div className="list-group">
                  {nonStandinElements}
                  </div>
                  </div>
                  </div>
                  <div className="panel panel-default">
                  <div className="panel-heading">Booked workday dates</div>
              <div className="panel-body">
                  <div className="list-group">
                  {nonWorkdayElements}
                  </div>
                  </div>
                  </div>

          </div>
    );
  }
}

export default Overview;
