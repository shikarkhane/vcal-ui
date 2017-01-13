import React, { Component } from 'react';
import reqwest from 'reqwest';

class Showups extends Component {
  handleDateChange(){
    console.log('handle date change- get vikarie working that date');
  }
  handleSave(){
    var group_id = 1;
    var work_date = '2017-01-15';
    var workday_user_ids = [1,2];
    var standin_user_ids = [3];
    reqwest({
        url: 'http://localhost:8080/show-ups/' + group_id + "/date/" + work_date + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ workday_user_ids: workday_user_ids,
          standin_user_ids: standin_user_ids})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
      <div className="page-header">
        <h1>Show ups<small>gs</small></h1>
        <div className="input-group">
          <span className="input-group-addon" id="addon-date">Choose date:</span>
          <input type="date" className="form-control" id="showup-chosen-date"
            aria-describedby="addon-date" onChange={this.handleDateChange}/>
        </div>
        <div className="input-group">
          <input type="checkbox" className="form-control" id="showup-user-1"
            aria-describedby="addon-user-1" onChange={this.handleDateChange}/>
          <span className="input-group-addon" data-user-id="1" id="addon-user-1">Jimmy</span>
        </div>
        <div className="input-group">
          <input type="checkbox" className="form-control" id="showup-user-2"
            aria-describedby="addon-user-2" onChange={this.handleDateChange}/>
          <span className="input-group-addon" data-user-id="2" id="addon-user-2">Nikhil</span>
        </div>
        <div className="input-group">
          <input type="checkbox" className="form-control" id="showup-user-3"
            aria-describedby="addon-user-3" onChange={this.handleDateChange}/>
          <span className="input-group-addon" data-user-id="3" id="addon-user-3">Eva</span>
        </div>
        <button id="confirm-showups" onClick={this.handleSave}>Confirm</button>
      </div>
    );
  }
}

export default Showups;
