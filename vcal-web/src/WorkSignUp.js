import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import { Link } from 'react-router';
import MyDatePicker from './CustomCalendar';
import {getHumanDate, isNonWorkingDay, makeId, isFutureDate} from './Utility';

class WorkSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { myWorkday:[], myStandin:[], openWorkday: [], openStandin: [],
    dictOpenWorkday: {}, dictOpenStandin: {},
      ruleSet : { "standin": [0,0,0], "workday": [0,0,0]}, childrenCount: 0};

    this.getStandinRule = this.getStandinRule.bind(this);
    this.getWorkdayRule = this.getWorkdayRule.bind(this);
    this.getRule = this.getRule.bind(this);
  }
  componentDidMount() {
    this.getRule();
    this.getMyWorkday();
    this.getMyStandin();
    this.getOpenWorkday();
    this.getOpenStandin();

    this.setState({childrenCount: localStorage.getItem("childrenCount")});

  }
  getStandinRule(){
    return this.state.ruleSet.standin[this.state.childrenCount - 1];
  }
  getWorkdayRule(){
    return this.state.ruleSet.workday[this.state.childrenCount - 1];
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
        self.setState({dictOpenWorkday: self.getDictOfDatesWorkday(resp)});
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
        self.setState({dictOpenStandin: self.getDictOfDatesStandin(resp)});
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
  getDictOfDatesStandin(response_array){
    // this function returns a dictionary of key=standin_date timestamp and a value=1
    var result = new Map(response_array.map((i) => [i.standin_date, 1]));
    return result;
  }
  getDictOfDatesWorkday(response_array){
    // this function returns a dictionary of key=work_date timestamp and a value=1
    var result = new Map(response_array.map((i) => [i.work_date, 1]));
    return result;
  }
  getRule(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    var termId = localStorage.getItem("defaultTermId");

    // todo: get list of terms for given group id
    reqwest({
      url: conf.serverUrl + '/rule/' + groupId + '/term/' + termId + '/'
      , type: 'json'
      , contentType: 'application/json'
      , method: 'get'
      , success: function (resp) {
        if ( Object.keys(resp).length === 0 && resp.constructor === Object ){
          return 0;
        }

        self.setState({ruleSet: JSON.parse(resp.definition)});
      }
    });
  }
  render() {
    // days already selected by user
    const standins = this.state.myStandin;
    const standinElements = standins
            .filter(function(s) { return !isNonWorkingDay(s.standin_date); })
            .filter(function(s) { return isFutureDate(s.standin_date); })
            .map((s) =>
        <MyDatePicker key={s.standin_date+s.id} chosenDate={s.standin_date} openDates={this.state.dictOpenStandin} />
  );
    const workdays = this.state.openWorkday;
    const workdayElements = workdays
            .filter(function(s) { return !isNonWorkingDay(s.work_date); })
            .filter(function(s) { return isFutureDate(s.work_date); })
            .map((s) =>
        <MyDatePicker key={s.work_date+s.id} chosenDate={s.work_date} openDates={this.state.dictOpenWorkday} />
  );

    //create new date columns based on rule set
    const range = n => Array.from({length: n}, (value, key) => key);

    var n = this.getStandinRule();
    const standinRange = range(n);

    var y = this.getWorkdayRule();
    const workdayRange = range(y);

    const standinFromRule = standinRange
            .map((s) =>
        <MyDatePicker key={'standin' + s} openDates={this.state.dictOpenStandin} />
      );
    const workdayFromRule = workdayRange
            .map((s) =>
        <MyDatePicker key={'workday' + s} openDates={this.state.dictOpenWorkday} />
      );



    return (
      <div >
        <Header />
        <h1>WorkSignUp</h1>
            <MyDatePicker chosenDate="2017-03-23" openDates={this.state.dictOpenStandin} />

        <Link to={'/switchday' }>
            <button className="btn btn-primary btn-lg pull-right" type="button" >
            Switch dates
      </button>
        </Link>

    <div className="panel panel-default">
        <div className="panel-heading">Standin dates</div>
    <div className="panel-body">
        <div className="list-group">
        {standinElements}
        {standinFromRule}
        </div>
        </div>
        </div>
        <div className="panel panel-default">
        <div className="panel-heading">Workday dates</div>
    <div className="panel-body">
        <div className="list-group">
        {workdayElements}
    {workdayFromRule}
        </div>
        </div>
        </div>      </div>
    );
  }
}

export default WorkSignUp;
