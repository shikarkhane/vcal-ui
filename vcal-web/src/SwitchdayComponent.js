import React, { Component } from 'react';
import reqwest from 'reqwest';

class SwitchdayComponent extends Component {
  handleSave(){
    /*
    reqwest({
        url: 'http://localhost:8080/sv/work-sign-up/' + group_id + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ chosen_date: chosen_date, user_id: user_id,
          is_workday: is_workday, is_taken: is_taken})
      , success: function (resp) {
          console.log(resp);
        }
    });
    */
  }
  render() {
    return (
            <div>
              <h4>Switch your days</h4>
              <div className="input-group">
                <input type="checkbox" className="form-control" data-pick-date="2017-01-13"
                  aria-describedby="addon-pickdate-1" onChange={this.handleSave}/>
                <span className="input-group-addon" id="addon-pickdate-1">2017-01-13</span>
              </div>
              <div className="input-group">
                <input type="checkbox" className="form-control" data-pick-date="2017-01-18"
                  aria-describedby="addon-pickdate-2" onChange={this.handleSave}/>
                <span className="input-group-addon" id="addon-pickdate-2">2017-01-18</span>
              </div>
              <div className="input-group">
                <input type="checkbox" className="form-control" data-pick-date="2017-01-21"
                  aria-describedby="addon-pickdate-3" onChange={this.handleSave}/>
                <span className="input-group-addon" id="addon-pickdate-3">2017-01-21</span>
              </div>
            </div>
    );
  }
}

export default SwitchdayComponent;
