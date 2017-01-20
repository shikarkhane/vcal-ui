import { conf } from './config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import { hashHistory } from 'react-router';

class CreateSummon extends Component {
  constructor(props) {
   super(props);
   this.state = {workDate: "", fromTime: "", tillTime: ""};

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
    var groupId = localStorage.getItem("groupId");
    var creatorId = 1;
    reqwest({
        url: conf.serverUrl + '/summon/' + groupId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: creatorId, work_date: this.state.workDate,
          from_time: this.state.fromTime, to_time: this.state.tillTime})
      , success: function (resp) {
          console.log(resp);
          hashHistory.push('/summon');
        }
    });
  }
  render() {
    return (

            <form onSubmit={this.handleSave}>
                <label>Date
                  <input type="date"
                  onChange={this.changeDate} value={this.state.workDate} />
                </label>
                <label >From
                <input type="number" placeholder="0900"
                  onChange={this.changeFromTime} value={this.state.fromTime}/>
                </label>
                <label >To
                <input type="number" placeholder="1630"
                  onChange={this.changeTillTime} value={this.state.tillTime}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
    );
  }
}

export default CreateSummon;
