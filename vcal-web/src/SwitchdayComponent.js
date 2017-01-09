import React, { Component } from 'react';

class PickDate extends Component{
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
  render(){
    return (
      <div className="input-group">
        <input type="checkbox" className="form-control" data-pick-date="{this.props.chosenDate}"
           onChange={this.handleSave}/>
        <span className="input-group-addon" >{this.props.chosenDate}</span>
      </div>
    );
  }
}
class SwitchdayComponent extends Component {
  render() {
    return (
            <div>
              <h4>{this.props.headerCaption}</h4>
              <PickDate chosenDate="2017-01-18" />
              <PickDate chosenDate="2017-01-20" />
              <PickDate chosenDate="2017-01-21" />
            </div>
    );
  }
}

export default SwitchdayComponent;
