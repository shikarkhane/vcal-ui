import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {makeId}from './Utility';
import Feedback from './Feedback';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CreateSummon extends Component {
  constructor(props) {
   super(props);
   this.state = {workDate: "", fromTime: "",
       tillTime: "", createDisabled: false,
   feedbackMessage:""};

   this.changeDate = this.changeDate.bind(this);
   this.changeFromTime = this.changeFromTime.bind(this);
   this.changeTillTime = this.changeTillTime.bind(this);
   this.handleSave = this.handleSave.bind(this);

 }

  changeDate(e){
    this.setState({workDate: e.target.value });
  }
  changeFromTime(e){
    this.setState({fromTime: e.target.value });
  }
  changeTillTime(e){
    this.setState({tillTime: e.target.value });
  }
  handleSave(e){
    e.preventDefault();
    var self = this;
      this.setState({createDisabled: true });
    var groupId = localStorage.getItem("groupId");
    var creatorId = localStorage.getItem("userId");
    var workDate = Math.floor(((new Date(this.state.workDate)).getTime())/1000);
    var jsonBody = { created_by_id: creatorId, work_date: workDate,
        from_time_in_24hours: this.state.fromTime, to_time_in_24hours: this.state.tillTime, id: makeId()};
    reqwest({
        url: conf.serverUrl + '/summon/' + groupId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: creatorId, work_date: workDate,
            from_time: this.state.fromTime, to_time: this.state.tillTime})
      , success: function (resp) {
          //console.log(resp);
            if (resp.status === 'ok'){
                jsonBody.id = resp.id;
                self.props.onUpdate(jsonBody);
                self.setState({feedbackMessage : resp.status});
            }
        }
    });
  }
  render() {
      var display = null;
      if ( (this.state.feedbackMessage).length > 0 ){
          display = <Feedback message={this.state.feedbackMessage} classes="alert alert-success" />;
      }
    return (
      <form className="form-horizontal" onSubmit={this.handleSave}>
        <div className="form-group">
          <label htmlFor="inputDate1" className="col-sm-2 control-label">Date:</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="inputDate1"
                onChange={this.changeDate} value={this.state.workDate}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputFromtime" className="col-sm-2 control-label">From time:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="inputFromtime"
              placeholder="0900"
                  onChange={this.changeFromTime} value={this.state.fromTime}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputTilltime" className="col-sm-2 control-label">Till time:</label>
          <div className="col-sm-10">
            <input type="number" className="form-control" id="inputTilltime"
              placeholder="1600"
                  onChange={this.changeTillTime} value={this.state.tillTime}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled={this.state.createDisabled}>
                Create </button>
          </div>
        </div>
          <ReactCSSTransitionGroup
              transitionName="feedback"
              transitionAppear={true}
              transitionAppearTimeout={1000}
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={300} >
                  {display}
          </ReactCSSTransitionGroup>
      </form>
    );
  }
}

export default CreateSummon;
