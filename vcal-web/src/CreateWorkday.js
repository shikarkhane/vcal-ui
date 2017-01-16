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
    var groupId = 1;
    var creatorId = 1;
    reqwest({
        url: 'http://localhost:8080/workday/' + groupId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: creatorId, work_date: this.state.workDate,
          from_time: this.state.fromTime, to_time: this.state.tillTime,
        standin_user_id: "", is_half_day: this.state.halfDay})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
            <form onSubmit={this.handleSave}>
                <h4>Create workday</h4>
                <label >Date
                  <input type="date"
                    onChange={this.changeDate} value={this.state.workDate} />
                </label>
                <label >From
                  <input type="number" placeholder="0900"
                    onChange={this.changeFromTime} value={this.state.fromTime} />
                </label>
                <label >To
                  <input type="number" placeholder="1630"
                    onChange={this.changeTillTime} value={this.state.tillTime} />
                </label>
                <label >Half day
                  <input type="checkbox"
                    onChange={this.changeHalfDay} value={this.state.halfDay} />
                </label>
                <input type="submit" value="Submit" />
            </form>
    );
  }
}

export default CreateWorkday;
