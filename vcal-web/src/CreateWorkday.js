import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class CreateWorkday extends Component {
  constructor(props) {
   super(props);
   this.state = {workDate: '', fromTime: '', tillTime : '',
     halfDay: false};

   this.changeDate = this.changeDate.bind(this);
   this.changeFromTime = this.changeFromTime.bind(this);
   this.changeTillTime = this.changeTillTime.bind(this);
   this.changeHalfDay = this.changeHalfDay.bind(this);
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
  changeHalfDay(e){
    this.setState({halfDay: e.target.checked });
  }
  handleSave(e){
    e.preventDefault();
    var groupId = localStorage.getItem("groupId");
    var creatorId = localStorage.getItem("userId");
    var workDate = Math.floor(((new Date(this.state.workDate)).getTime())/1000);
    reqwest({
        url: conf.serverUrl + '/workday/' + groupId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: creatorId, work_date: workDate,
          from_time: this.state.fromTime, to_time: this.state.tillTime,
        standin_user_id: "", is_half_day: this.state.halfDay})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
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
            <div className="checkbox">
              <label>
                <input type="checkbox" onChange={this.changeHalfDay}
                  value={this.state.halfDay} /> Half day?
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Create</button>
          </div>
        </div>
      </form>
    );
  }
}

export default CreateWorkday;
