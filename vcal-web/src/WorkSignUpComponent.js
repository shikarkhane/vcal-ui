import React, { Component } from 'react';
import reqwest from 'reqwest';

class WorkSignUpComponent extends Component {
  handleSave(){
    var group_id = 1;
    var chosen_date = '2017-01-21';
    var user_id = 1;
    var is_workday = true;
    var is_taken = true;

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

    /*
    $.ajax({
          contentType : 'application/json',
          method: "GET",
          url: "/sv/work-sign-up/" + group_id + "/"
          // ,data: JSON.stringify({ workday_user_ids: workday_user_ids, standin_user_ids: standin_user_ids})
        })
          .done(function( msg ) {
            console.log('get work sign up');
          });
    $.ajax({
          contentType : 'application/json',
          method: "GET",
          url: "/sv/term_details/" + group_id + "/"
        })
          .done(function( msg ) {
            console.log(msg);
          });
    */
  }
  render() {
    return (
            <div>
              <h4>{this.props.headerCaption}</h4>
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

export default WorkSignUpComponent;
