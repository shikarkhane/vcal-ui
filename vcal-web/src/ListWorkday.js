import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate, isFutureDate, isInChosenTerm, getUserInfo}from './Utility';

class WorkdayElement extends Component{
    constructor(props) {
        super(props);
        this.handleDeleteWorkday = this.handleDeleteWorkday.bind(this);
        this.state = {disabled: false};
    }
  handleDeleteWorkday(workdayId, self){
      this.setState({disabled: true });
    reqwest({
        url: conf.serverUrl + '/workday/' + workdayId + '/'
      , type: 'json'
      , method: 'delete'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({workdays: resp});
        }
    });
  }
  render(){

    var workdayId = this.props.workdayId;
    var halfDayText = "full day";
    var isHalfDay = this.props.halfDay;
    var name = (getUserInfo(this.props.userId)).name;

    if ( isHalfDay ){
      halfDayText = "half day";
    }
    return (
      <div className="alert alert-success" role="alert">
        On {this.props.date} , stand-in needed between {this.props.fromTime}
        till  {this.props.tillTime} for {halfDayText} (Booked by: {name})

        <button type="button" className="btn btn-warning float-right" disabled={this.state.disabled}
          onClick={this.handleDeleteWorkday.bind(this, workdayId)} >
          <span className="glyphicon glyphicon-remove" aria-hidden="true">X</span>
        </button>
      </div>
    );
  }
}


class ListWorkday extends Component {
  render() {
    const wds = this.props.data;
    const workdayButtons = wds
            .filter(function(s) { return isFutureDate(s.work_date); })
            .filter(function (s) { return isInChosenTerm(s.work_date); })
            .map((wd) =>
    <WorkdayElement key={wd.work_date+wd.id} workdayId={wd.id}
      date={getHumanDate(wd.work_date)}
      fromTime={wd.from_time_in_24hours} tillTime={wd.to_time_in_24hours}
      halfDay={wd.is_half_day} userId={wd.standin_user_id}/>
  );
    return (
      <div>
           {workdayButtons}
      </div>

    );
  }
}

export default ListWorkday;
