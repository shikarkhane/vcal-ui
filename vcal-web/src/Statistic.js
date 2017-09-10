import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import {isNonWorkingDay, getUserInfo, isInChosenTerm} from './Utility';

class Statistic extends Component {
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
    const standins = this.state.openStandin;
    const standinArray = standins
            .filter(function(s) { return !isNonWorkingDay(s.standin_date); })
            .filter(function (s) { return isInChosenTerm(s.standin_date); })
            .map((s) => (1)
      );
    const workdays = this.state.openWorkday;
    const workdayArray = workdays
            .filter(function(s) { return !isNonWorkingDay(s.work_date); })
            .filter(function (s) { return isInChosenTerm(s.work_date); })
            .map((s) => (1)
    );
      var standinCount = standinArray.length;
      var workdayCount = workdayArray.length;

      // reduce booked into count by user
      const nonstandins = this.state.nonOpenStandin;
      const nonStandinArray = nonstandins
              .filter(function(s) { return !isNonWorkingDay(s.standin_date); })
              .filter(function (s) { return isInChosenTerm(s.standin_date); })
              .map((s) =>
          (s.standin_user_id)
  );
      const nonworkdays = this.state.nonOpenWorkday;
      const nonWorkdayArray = nonworkdays
              .filter(function(s) { return !isNonWorkingDay(s.work_date); })
              .filter(function (s) { return isInChosenTerm(s.work_date); })
              .map((s) =>
          (s.standin_user_id)
  );

      var userStandinStat = {}; // this will look like { '2jhjkh339-23jhjh32': 5, ...}
      for (var i = 0; i < nonStandinArray.length; i++) {
          if( userStandinStat[nonStandinArray[i]] === null || userStandinStat[nonStandinArray[i]] === undefined) {
              userStandinStat[nonStandinArray[i]] = 0;
          }
          userStandinStat[nonStandinArray[i]] += 1;
      }
      var userWorkdayStat = {};
      for (var i = 0; i < nonWorkdayArray.length; i++) {
          if( userWorkdayStat[nonWorkdayArray[i]] === null || userWorkdayStat[nonWorkdayArray[i]] === undefined) {
              userWorkdayStat[nonWorkdayArray[i]] = 0;
          }
          userWorkdayStat[nonWorkdayArray[i]] += 1;
      }

      //consolidate
      var userStats = {}; // this will look like { '2jhjkh339-23jhjh32': [5,2] , '2jhjkh339-23jhjh32': [0,2] , ...}
      for (var key in userStandinStat) {
          if( userStats[key] === null || userStats[key] === undefined) {
              userStats[key] = {"standin_count": 0, "workday_count": 0};
          }
          userStats[key]['standin_count'] += userStandinStat[key];
      };
      for (var key in userWorkdayStat) {
          if( userStats[key] === null || userStats[key] === undefined) {
              userStats[key] = {"standin_count": 0, "workday_count": 0};
          }
          userStats[key]['workday_count'] += userWorkdayStat[key];
      };

      var finalStats = [];
      //convert dict to array to easy render with map
      for( var r in userStats){
          finalStats.push({"userId": r,
              "standin_count": userStats[r]["standin_count"],
              "workday_count": userStats[r]["workday_count"]
          })
      };

      var sortedFinalStats = finalStats.sort(function(a,b) {
          return (a.workday_count > b.workday_count) ? 1 : ((b.workday_count > a.workday_count) ? -1 : 0);
      } );
      const statElements = sortedFinalStats
              .map((s) =>
          <tr key={s.userId}>
              <td>{(getUserInfo(s.userId)).name}</td>
              <td>{s.standin_count}</td>
              <td>{s.workday_count}</td>
          </tr>
  );


      return (
            <div>
          <Header />
          <h1>Statistic</h1>
          <h3>Unbooked Stand-in dates <span className="label label-default">{standinCount}</span></h3>
          <h3>Unbooked Workday dates <span className="label label-default">{workdayCount}</span></h3>
          <table className="table table-striped table-condensed table-responsive">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Stand-in</th>
                  <th>Workday</th>
              </tr>
          </thead>
          <tbody>

          {statElements}

          </tbody>
          </table>
          </div>
    );
  }
}

export default Statistic;
