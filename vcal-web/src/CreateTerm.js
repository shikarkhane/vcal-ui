import React, { Component } from 'react';
import reqwest from 'reqwest';

class CreateSummon extends Component {
  handleSave(){
    reqwest({
        url: 'http://localhost:8080/term/'
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
                <label >Term name</label>
                <input id="term-name" type="text" />
                <label >Start Date</label>
                <input id="create-term-startdate" type="date" />
                <label >End Date</label>
                <input id="create-term-enddate" type="date" />

                <label >Family count with 1 kid</label>
                <input id="term-family-1" type="number"  placeholder="15"/>
                <label >Family count with 2 kid</label>
                <input id="term-family-2" type="number"  placeholder="5"/>
                <label >Family count with 3 kid</label>
                <input id="term-family-3" type="number"  placeholder="1"/>
                <button id="create-term-save" onClick={this.handleSave}>Save</button>
            </div>
    );
  }
}

export default CreateSummon;
