import React, { Component } from 'react';
import reqwest from 'reqwest';

class Rule extends Component {
  handleChange(){
    reqwest({
        url: 'http://localhost:8080/sv/rule/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ group_id: 1,
           definition: {standin: [1, 2, 3], workday: [1, 2, 3]}})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
      <div className="page-header">
        <h1>Rule<small>Gomorronsol</small></h1>
          <div>
              <h4>Stand-in day rule</h4>
              <label for="standin-rule-family-1">Family with 1 kid</label>
              <input id="standin-rule-family-1" onChange={this.handleChange} type="number"  placeholder="15"/>
              <label for="standin-rule-family-2">Family with 2 kids</label>
              <input id="standin-rule-family-2"  onChange={this.handleChange} type="number"  placeholder="5"/>
              <label for="standin-rule-family-3">Family with 3 kids</label>
              <input id="standin-rule-family-3"  onChange={this.handleChange} type="number"  placeholder="1"/>
          </div>
          <div>
              <h4>Work day rule</h4>
              <label for="workday-rule-family-1">Family with 1 kid</label>
              <input id="workday-rule-family-1"  onChange={this.handleChange} type="number"  placeholder="15"/>
              <label for="workday-rule-family-2">Family with 2 kids</label>
              <input id="workday-rule-family-2"  onChange={this.handleChange} type="number"  placeholder="5"/>
              <label for="workday-rule-family-3">Family with 3 kids</label>
              <input id="workday-rule-family-3"  onChange={this.handleChange} type="number"  placeholder="1"/>
          </div>
      </div>
    );
  }
}

export default Rule;
