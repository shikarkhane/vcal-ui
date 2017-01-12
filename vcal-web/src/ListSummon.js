import React, { Component } from 'react';
import reqwest from 'reqwest';

class ListSummon extends Component {
  handleGet(){
    reqwest({
        url: 'http://localhost:8080/summon/'
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
            <div data-role="collapsible" data-mini="true">
                  <a href="#" >On 23rd Dec, stand-in needed between 9 AM till 4:30 PM</a>
                  <a href="#" >On 29th Dec, stand-in needed between 2 PM till 4:30 PM</a>
            </div>

    );
  }
}

export default ListSummon;
