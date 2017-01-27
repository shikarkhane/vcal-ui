import { conf } from './Config';
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
   this.handleSave = this.handleSave.bind(this);
 }

  changeDate(e){

    this.setState({chosenDate: e.target.value });
  }
  getStandins(e){
    e.preventDefault();
    var self = this;
    var groupId = localStorage.getItem("groupId");
    var workDate = Math.floor(((new Date(this.state.chosenDate)).getTime())/1000);

    reqwest({
        url: conf.serverUrl + '/show-ups/' + groupId + "/date/" + workDate + "/"
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
    var groupId = localStorage.getItem("groupId");
    var workDate = Math.floor(((new Date(this.state.chosenDate)).getTime())/1000);
    var workdayUserIds = [1,2];
    var standinUserIds = [3];
    reqwest({
        url: conf.serverUrl + '/show-ups/' + groupId + "/date/" + workDate + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ workday_user_ids: workdayUserIds,
          standin_user_ids: standinUserIds})
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
