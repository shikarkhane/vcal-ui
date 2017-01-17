import React, { Component } from 'react';

class SwitchMyDate extends Component{
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

    const result ;
    if(Boolean(isWorkday)){
      result = (<div className="input-group">
        <input type="checkbox" className="form-control" data-pick-date="{this.props.chosenDate}"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate)}/>
        <span className="input-group-addon" >{this.props.chosenDate} between
          {this.props..from_time_in_24hours}
          till  {this.props.to_time_in_24hours}
          ( half-day={this.props..is_half_day} )</span>
      </div>);
    }
    else{
      result = (<div className="input-group">
        <input type="checkbox" className="form-control" data-pick-date="{this.props.chosenDate}"
           onChange={this.handleSave.bind(null, isWorkday, chosenDate)}/>
        <span className="input-group-addon" >{this.props.chosenDate}</span>
      </div>);
    }

    return (
      {result}
    );
  }
}
class SwitchdayComponent extends Component {
  constructor(props) {
   super(props);
   this.state = { myWorkday:[], myStandin:[]};
 }
 componentDidMount() {
      this.getMyWorkday();
      this.getMyStandin();
  }
  getMyWorkday(){
    var self = this;
    var groupId = 1;
    var userId = 1;
    reqwest({
        url: 'http://localhost:8080/myworkday/' + groupId + '/user/' + userId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({myWorkday: resp});
        }
    });
  }
  getMyStandin(){
    var self = this;
    var groupId = 1;
    var userId = 1;
    reqwest({
        url: 'http://localhost:8080/mystandin/' + groupId + '/user/' + userId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({myStandin: resp});
        }
    });
  }
  render() {
    const standins = this.state.myStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.standin_date} isWorkday="0"/>
    );
    const workdays = this.state.myWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchMyDate key={s.id} chosenDate={s.work_date} fromTime={s.from_time_in_24hours}
      tillTime={s.to_time_in_24hours} isHalfDay={s.is_half_day}  isWorkday="1" />
  );

    return (
      <div>
        <h4>You standin dates</h4>
          {standinSwitches}
        <h4>You workday dates</h4>
          {workdaySwitches}
      </div>
    );
  }
}

export default SwitchdayComponent;
