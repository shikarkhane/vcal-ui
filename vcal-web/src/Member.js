import React, { Component } from 'react';
import reqwest from 'reqwest';

class Member extends Component {
  handleAction(){
    console.log('take action after member click');
    /*reqwest({
        url: 'http://localhost:8080/sv/workday/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: 1, group_id: 1, work_date: '2017-01-10',
          from_time: "0900", to_time: "1600", standin_user_id: "", is_half_day: false})
      , success: function (resp) {
          console.log(resp);
        }
    });*/
  }
  render() {
    return (
      <div className="page-header">
        <h1>Member <small>Gomorronsol</small></h1>
          <ul className="list-group">
            <li className="list-group-item" onClick={this.handleAction}>Nikhil</li>
            <li className="list-group-item" onClick={this.handleAction}>Carin</li>
            <li className="list-group-item" onClick={this.handleAction}>Jimmy</li>
            <li className="list-group-item" onClick={this.handleAction}>Sussane</li>
            <li className="list-group-item" onClick={this.handleAction}>notYetRegisteredParentEmail@email.com</li>
          </ul>
      </div>
    );
  }
}

export default Member;
