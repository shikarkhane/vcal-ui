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

    // helper function to group by item of an object
    groupByArray(xs, key) { return xs.reduce(function (rv, x) { let v = key instanceof Function ? key(x) : x[key]; let el = rv.find((r) => r && r.key === v); if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv; }, []); }

    filterDates(data, isWorkdayData){
        if ( isWorkdayData){
            return(
                data
                    .filter(function(s) { return !isNonWorkingDay(s.work_date); })
                    .filter(function (s) { return isInChosenTerm(s.work_date); })
            );
        }
        else{
            return(
                data
                .filter(function(s) { return !isNonWorkingDay(s.standin_date); })
                .filter(function (s) { return isInChosenTerm(s.standin_date); })
            );
        }

    }


  render() {

    const standins = this.state.openStandin;
    const standinArray = this.filterDates(standins, false).map((s) => (1));

    const workdays = this.state.openWorkday;
    const workdayArray = this.filterDates(workdays, true).map((s) => (1));

      var standinCount = standinArray.length;
      var workdayCount = workdayArray.length;

      // reduce booked into count by user
      const nonstandins = this.state.nonOpenStandin;
      //this.groupByArray(nonstandins, "standin_user_id").map(x=>[x.key, x.values.length])
      //this.groupByArray(nonstandins, "standin_user_id").map(function(obj){var r={}; r[obj.key] = obj.values.length; return r;});

      const standinCountByUser = this.groupByArray((this.filterDates(nonstandins, false)), "standin_user_id")
                                .map(x=>[x.key, x.values.length]);

      const utfallDetails = (this.filterDates(nonstandins, false))
          .filter(function(s) { return s.has_not_worked; })
      const utfallStandinCountByUser = this.groupByArray(utfallDetails, "standin_user_id")
              .map(x=>[x.key, x.values.length]);

      const nonworkdays = this.state.nonOpenWorkday;
      const workdayCountByUser = this.groupByArray((this.filterDates(nonworkdays, true)), "standin_user_id")
                                .map(x=>[x.key, x.values.length]);



      var userStandinStat = {}; // this will look like { '2jhjkh339-23jhjh32': 5, ...}
      for (var i = 0; i < standinCountByUser.length; i++) {
          userStandinStat[standinCountByUser[i][0]] = standinCountByUser[i][1];
      };

        var userUtfallStat = {}; // this will look like { '2jhjkh339-23jhjh32': 5, ...}
        for (var i = 0; i < utfallStandinCountByUser.length; i++) {
            userUtfallStat[utfallStandinCountByUser[i][0]] = utfallStandinCountByUser[i][1];
        };

      var userWorkdayStat = {};
      for (var i = 0; i < workdayCountByUser.length; i++) {
          userWorkdayStat[workdayCountByUser[i][0]] = workdayCountByUser[i][1];
      };

      //consolidate
      var userStats = {}; // this will look like { '2jhjkh339-23jhjh32': [5,2] , '2jhjkh339-23jhjh32': [0,2] , ...}
      for (var key in userStandinStat) {
          if( userStats[key] === null || userStats[key] === undefined) {
              userStats[key] = {"standin_count": 0, "workday_count": 0, "utfall": 0};
          }
          userStats[key]['standin_count'] += userStandinStat[key];
      };
      for (var key in userUtfallStat) {
          if( userStats[key] === null || userStats[key] === undefined) {
              userStats[key] = {"standin_count": 0, "workday_count": 0, "utfall": 0};
          }
          userStats[key]['utfall'] += userUtfallStat[key];
      };
      for (var key in userWorkdayStat) {
          if( userStats[key] === null || userStats[key] === undefined) {
              userStats[key] = {"standin_count": 0, "workday_count": 0, "utfall": 0};
          }
          userStats[key]['workday_count'] += userWorkdayStat[key];
      };

      var finalStats = [];
      //convert dict to array to easy render with map
      for( var r in userStats){
          finalStats.push({"userId": r,
              "standin_count": userStats[r]["standin_count"],
              "workday_count": userStats[r]["workday_count"],
              "utfall_count": userStats[r]["utfall"]
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
      <td>{s.utfall_count}</td>
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
          <th>Utfall</th>
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
