import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate}from './Utility';

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
    if ( isHalfDay ){
      halfDayText = "half day";
    }
    return (
      <div className="alert alert-success" role="alert">
        On {this.props.date} , stand-in needed between {this.props.fromTime}
        till  {this.props.tillTime} for {halfDayText}

        <button type="button" className="btn btn-warning pull-right" disabled={this.state.disabled}
          onClick={this.handleDeleteWorkday.bind(this, workdayId)} >
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
    );
  }
}


class ListWorkday extends Component {
  constructor(props) {
   super(props);
   this.state = {workdays: []};
 }
 componentDidMount() {
      this.getWorkdays();
  }
  getWorkdays(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    reqwest({
        url: conf.serverUrl + '/workday/' + groupId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({workdays: resp});
        }
    });
  }

  render() {
    const wds = this.state.workdays;
    const workdayButtons = wds.map((wd) =>
    <WorkdayElement key={wd.work_date+wd.id} workdayId={wd.id}
      date={getHumanDate(wd.work_date)}
      fromTime={wd.from_time_in_24hours} tillTime={wd.to_time_in_24hours}
      halfDay={wd.is_half_day} />
  );
    return (
      <div>
           {workdayButtons}
      </div>

    );
  }
}

export default ListWorkday;
