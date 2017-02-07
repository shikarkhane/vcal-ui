import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate, isNonWorkingDay} from './Utility';


class PickDate extends Component{
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {disabled: false};
    }
  handleSave(pIsWorkday, chosenDate){
      this.setState({disabled: true });
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = (pIsWorkday === '1');

    reqwest({
        url: conf.serverUrl + '/work-sign-up/' + groupId + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
          is_workday: isWorkday})
      , success: function (resp) {
          //console.log(resp);
        }
    });
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    var isChosen = "list-group-item " + (this.state.disabled ? 'list-group-item-success' : '');
    return (
      <button type="button" className={isChosen}
        onClick={this.handleSave.bind(null, isWorkday, chosenDate)} disabled={this.state.disabled}>
        {getHumanDate(this.props.chosenDate)}
      </button>
    );
  }
}

class WorkSignUpComponent extends Component {
  constructor(props) {
   super(props);
   this.state = {openWorkday: [], openStandin: []};
 }
 componentDidMount() {
      this.getOpenWorkday();
      this.getOpenStandin();
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
  render() {
// let user uncheck a date, if its 30 days ahead

    const standins = this.state.openStandin;
    const standinElements = standins
            .filter(function(s) { return !isNonWorkingDay(s.standin_date); })
            .map((s) =>
    <PickDate key={s.standin_date+s.id} chosenDate={s.standin_date} isWorkday="0" />
      );
    const workdays = this.state.openWorkday;
    const workdayElements = workdays
            .filter(function(s) { return !isNonWorkingDay(s.work_date); })
            .map((s) =>
    <PickDate key={s.work_date+s.id} chosenDate={s.work_date} isWorkday="1" />
    );
    return (
            <div>
              <div className="panel panel-default">
                <div className="panel-heading">Choose standin dates</div>
                <div className="panel-body">
                  <div className="list-group">
                    {standinElements}
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">Choose workday dates</div>
                <div className="panel-body">
                  <div className="list-group">
                    {workdayElements}
                  </div>
                </div>
              </div>
            </div>
    );
  }
}

export default WorkSignUpComponent;
