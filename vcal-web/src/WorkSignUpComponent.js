import React, { Component } from 'react';
import reqwest from 'reqwest';


class PickDate extends Component{
  handleSave(isWorkday, chosenDate){
    var group_id = 1;
    var chosen_date = chosenDate;
    var user_id = 1;
    var is_workday = Boolean(isWorkday);
    var is_taken = true;

    reqwest({
        url: 'http://localhost:8080/work-sign-up/' + group_id + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ chosen_date: chosen_date, user_id: user_id,
          is_workday: is_workday, is_taken: is_taken})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }

  render(){
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;

    return (
      <div className="input-group">
        <input type="checkbox" className="form-control" data-pick-date="{this.props.chosenDate}"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate)}/>
        <span className="input-group-addon" >{this.props.chosenDate}</span>
      </div>
    );
  }
}

class WorkSignUpComponent extends Component {
  constructor(props) {
   super(props);
   this.state = {openWorkday: [], openStandin: []};
 }
 componentDidMount() {
      this.getOpenWorkday();
      this.getOpenStandin();
  }
  getOpenWorkday(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    reqwest({
        url: 'http://localhost:8080/openworkday/' + groupId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({openWorkday: resp});
        }
    });
  }
  getOpenStandin(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    reqwest({
        url: 'http://localhost:8080/openstandin/' + groupId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({openStandin: resp});
        }
    });
  }
  render() {
// let user uncheck a date, if its 30 days ahead

    const standins = this.state.openStandin;
    const standinElements = standins.map((s) =>
    <PickDate key={s.id} chosenDate={s.standin_date} isWorkday="0"/>
  );
  const workdays = this.state.openWorkday;
  const workdayElements = workdays.map((s) =>
  <PickDate key={s.id} chosenDate={s.work_date} isWorkday="1"/>
);
    return (
            <div>
              <h4>Choose standin dates</h4>
                {standinElements}
              <h4>Choose workday dates</h4>
                {workdayElements}
            </div>
    );
  }
}

export default WorkSignUpComponent;
