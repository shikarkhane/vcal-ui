import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate, isNonWorkingDay, makeId, isFutureDate} from './Utility';



class PickDate extends Component{
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {disabled: false};
    }
  handleSave(pIsWorkday, chosenDate){
      var self = this;
      this.setState({disabled: true });
    var groupId = localStorage.getItem("groupId");
    var userId = localStorage.getItem("userId");
    var isWorkday = pIsWorkday;

      var jsonBody = {standin_date: chosenDate, id: makeId()};
      if( isWorkday){
          jsonBody = {work_date: chosenDate, from_time_in_24hours: this.props.fromTime,
              to_time_in_24hours: this.props.tillTime, id : makeId()};
      }


    reqwest({
        url: conf.serverUrl + '/work-sign-up/' + groupId + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ chosen_date: chosenDate, user_id: userId,
          is_workday: isWorkday})
      , success: function (resp) {
          //console.log(resp);
          if (resp.status === 'ok'){
            jsonBody.id = resp.id;
            self.props.onTake(jsonBody, isWorkday);
          }
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
  render() {
// let user uncheck a date, if its 30 days ahead

    const standins = this.props.openStandin;
    const standinElements = standins
            .filter(function(s) { return !isNonWorkingDay(s.standin_date); })
            .filter(function(s) { return isFutureDate(s.standin_date); })
            .map((s) =>
    <PickDate key={s.standin_date+s.id} chosenDate={s.standin_date} isWorkday={false}
      onTake={this.props.onTake}/>
      );
    const workdays = this.props.openWorkday;
    const workdayElements = workdays
            .filter(function(s) { return !isNonWorkingDay(s.work_date); })
            .filter(function(s) { return isFutureDate(s.work_date); })
            .map((s) =>
    <PickDate key={s.work_date+s.id} chosenDate={s.work_date} isWorkday={true}
      onTake={this.props.onTake}
      fromTime={s.from_time_in_24hours} tillTime={s.to_time_in_24hours}/>
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
