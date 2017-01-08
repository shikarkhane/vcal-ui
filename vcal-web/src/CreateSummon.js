import React, { Component } from 'react';
import reqwest from 'reqwest';

class CreateSummon extends Component {
  handleSave(){
    reqwest({
        url: 'http://localhost:8080/sv/summon/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: 1, group_id: 1, work_date: "2016-12-01",
          from_time: "0900", to_time: "1600"})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
            <div>
                <h4>Create summon</h4>
                <label >Date</label>
                <input id="create-summon-date" data-mini="true" type="date" />
                <label >From</label>
                <input id="create-summon-fromtime" data-mini="true" type="number" placeholder="0900"/>
                <label >To</label>
                <input id="create-summon-totime" data-mini="true" type="number" placeholder="1630"/>
                <button id="create-summon-save" onClick={this.handleSave}>Save</button>
            </div>
    );
  }
}

export default CreateSummon;
