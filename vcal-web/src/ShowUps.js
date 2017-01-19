import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';

class StandinElement extends Component{
  render(){
    return (
      <label>
        <input type="checkbox" />
        {this.props.standinName}
      </label>
    );
  }
}
class Showups extends Component {
  constructor(props) {
   super(props);
   this.state = {standins: {'standin':[], 'workday':[]}};

   this.changeDate = this.changeDate.bind(this);
 }

  changeDate(e){
    this.setState({chosenDate: e.target.value });
  }
  getStandins(e){
    e.preventDefault();
    var self = this;
    var group_id = 1;
    var work_date = this.state.chosenDate;

    reqwest({
        url: 'http://localhost:8080/show-ups/' + group_id + "/date/" + work_date + "/"
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({standins: resp});
        }
    });
  }
  handleSave(e){
    e.preventDefault();
    var group_id = 1;
    var work_date = this.state.chosenDate;
    var workday_user_ids = [1,2];
    var standin_user_ids = [3];
    reqwest({
        url: 'http://localhost:8080/show-ups/' + group_id + "/date/" + work_date + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ workday_user_ids: workday_user_ids,
          standin_user_ids: standin_user_ids})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    const sins = this.state.standins.standin;
    const standins = sins.map((sin) =>
    <StandinElement key={sin.id} standinDayId={sin.id}
      standinUserId={sin.standin_user_id}
      />
  );

    return (
      <div>
        <Header />
        <form onSubmit={this.handleSave}>
          <h1>Show ups<small>gs</small></h1>
          <label>
            Choose date:
            <input type="date" onChange={this.changeDate} value={this.state.chosenDate} />
            <input type="button" onClick={this.getStandins.bind(this)} value="Get" />
          </label>
          {standins}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Showups;
