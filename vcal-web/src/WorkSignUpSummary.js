import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate, makeId, isWith30DaysFromNow, isFutureDate} from './Utility';

class MySignUps extends Component{
    constructor(props) {
        super(props);
        this.handleDeleteSignup = this.handleDeleteSignup.bind(this);

        if (isWith30DaysFromNow(this.props.chosenDate)){
            this.state = {disabled: true};
        }
        else{
            this.state = {disabled: false};
        }

    }
  handleDeleteSignup(signupId, isWorkday, chosenDate){
      this.setState({disabled: true });
      var self = this;

      var jsonBody = {standin_date: chosenDate, id: makeId()};
      if( isWorkday){
          jsonBody = {work_date: chosenDate, from_time_in_24hours: this.props.fromTime,
              to_time_in_24hours: this.props.tillTime, id : makeId()};
      }


      if (isWorkday){
      reqwest({
          url: conf.serverUrl + '/workday/' + signupId + '/'
        , type: 'json'
        , method: 'put'
        , contentType: 'application/json'
        , success: function (resp) {
            //console.log(resp);
              self.props.onRemove(jsonBody, isWorkday);
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
            //console.log(resp);
              self.props.onRemove(jsonBody, isWorkday);
          }
      });
    }

  }
  render(){
    var signupId = this.props.signupId;
    var isWorkday = this.props.isWorkday;
      var chosenDate = this.props.chosenDate;
      var fromTime = this.props.fromTime;
      var tillTime = this.props.tillTime;

    return (
      <div className="alert alert-success" role="alert">
        {this.props.textToDisplay}
          <button type="button" className="btn btn-warning pull-right" disabled={this.state.disabled}
              onClick={this.handleDeleteSignup.bind(null, signupId, isWorkday, chosenDate, fromTime, tillTime)} >
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
      </div>
    );
  }
}
class WorkSignUpSummary extends Component {
  render() {
    const standins = this.props.myStandin;
    const standinLabels = standins
            .filter(function(s) { return isFutureDate(s.standin_date); })
            .map((s) =>
    <MySignUps key={s.standin_date+s.id} textToDisplay={getHumanDate(s.standin_date)}
      isWorkday={false} signupId={s.id}
      onRemove={this.props.onRemove} chosenDate={s.standin_date}/>
      );
      const workdays = this.props.myWorkday;
      const workdayLabels = workdays
              .filter(function(s) { return isFutureDate(s.work_date); })
              .map((s) =>
      <MySignUps key={s.work_date+s.id} textToDisplay={getHumanDate(s.work_date) + 'between'
        +  s.from_time_in_24hours + 'till' + s.to_time_in_24hours}
        isWorkday={true} signupId={s.id}
      onRemove={this.props.onRemove}
      chosenDate={s.work_date}
      fromTime={s.from_time_in_24hours} tillTime={s.to_time_in_24hours}/>
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
