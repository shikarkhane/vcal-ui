import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import getHumanDate from './Utility';


class PickDate extends Component{
  handleSave(pIsWorkday, chosenDate){
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = (pIsWorkday === '1');
    var isTaken = true;

    reqwest({
        url: conf.serverUrl + '/work-sign-up/' + groupId + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
          is_workday: isWorkday, is_taken: isTaken})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;

    return (
      <button type="button" className="list-group-item"
        onClick={this.handleSave.bind(null, isWorkday, chosenDate)}>
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
    const standinElements = standins.map((s) =>
    <PickDate key={s.id} chosenDate={s.standin_date} isWorkday="0"/>
      );
    const workdays = this.state.openWorkday;
    const workdayElements = workdays.map((s) =>
    <PickDate key={s.id} chosenDate={s.work_date} isWorkday="1"/>
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
