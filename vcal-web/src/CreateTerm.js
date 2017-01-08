import React, { Component } from 'react';
import reqwest from 'reqwest';

class CreateSummon extends Component {
  handleSave(){
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
            <div>
                <h4>Create term</h4>
                <label for="term-name">Term name</label>
                <input id="term-name" data-mini="true" type="text" />
                <label for="create-term-startdate">Start Date</label>
                <input id="create-term-startdate" data-mini="true" type="date" />
                <label for="create-term-enddate">End Date</label>
                <input id="create-term-enddate" data-mini="true" type="date" />

                <label for="term-family-1">Family count with 1 kid</label>
                <input id="term-family-1" data-mini="true" type="number"  placeholder="15"/>
                <label for="term-family-2">Family count with 2 kid</label>
                <input id="term-family-2" data-mini="true" type="number"  placeholder="5"/>
                <label for="term-family-3">Family count with 3 kid</label>
                <input id="term-family-3" data-mini="true" type="number"  placeholder="1"/>
                <button id="create-term-save" onClick={this.handleSave}>Save</button>
            </div>
    );
  }
}

export default CreateSummon;
