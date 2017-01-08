import React, { Component } from 'react';
import reqwest from 'reqwest';

class CreateWorkday extends Component {
  handleSave(){
    reqwest({
        url: 'http://localhost:8080/sv/workday/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: 1, group_id: 1, work_date: '2017-01-10',
          from_time: "0900", to_time: "1600", standin_user_id: "", is_half_day: false})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
            <div>
                <h4>Create workday</h4>
                <label >Date</label>
                <input id="create-workday-date" type="date" />
                <label >From</label>
                <input id="create-workday-fromtime" type="number" placeholder="0900"/>
                <label >To</label>
                <input id="create-workday-totime" type="number" placeholder="1630"/>
                <label >Half day</label>
                <input id="create-workday-halfday" type="checkbox"/>
                <button id="create-workday-save" onClick={this.handleSave}>Save</button>
            </div>
    );
  }
}

export default CreateWorkday;
