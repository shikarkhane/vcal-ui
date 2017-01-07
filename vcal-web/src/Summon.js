import React, { Component } from 'react';
import reqwest from 'reqwest';

class Summon extends Component {
  render() {

    reqwest({
        url: 'http://localhost:8080/sv/rule/'
      , method: 'post'
      , data: {standin: [1, 2, 3], workday: [4, 5, 6]}
      , success: function (resp) {
          console.log(resp);
        }
    });

    return (
      <div className="page-header">
        <h1>Summon<small>Gomorronsol</small></h1>
      </div>
    );
  }
}

export default Summon;
