import React, { Component } from 'react';
import reqwest from 'reqwest';

class ListSummon extends Component {
  handleGet(){
    reqwest({
        url: 'http://localhost:8080/sv/term/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ group_id: 1,
          term_name: "test term", start_date: '2017-01-14', end_date: '2017-03-14',
           family_spread: {kid_1: 10, kid_2: 5, kid_3: 2}})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
      <div >
          <h3>VT 2016 ( Jan to Jul 2016 ) - Total kids: 31</h3>
          <ul data-role="listview">
              <li>15 families with 1 kids</li>
              <li>5 families with 2 kids</li>
              <li>2 families with 3 kids</li>
          </ul>
      </div>

    );
  }
}

export default ListSummon;
