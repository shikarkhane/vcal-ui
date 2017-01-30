import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import getHumanDate from './Utility';


class StandinElement extends Component{
  handleSave(userId, isWorkday, chosenDate){
    var groupId = localStorage.getItem("groupId");
    var workDate = Math.floor(((new Date(chosenDate)).getTime())/1000);

    reqwest({
        url: conf.serverUrl + '/show-ups/' + groupId + "/date/" + workDate + "/"
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ userId: userId,
          isWorkday: isWorkday})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render(){
    var userId = this.props.standinUserId;
    var isWorkday = this.props.isWorkday;
    var chosenDate = this.props.chosenDate;
    if (userId === null){
      return null;
    }
    else{
      return (
        <label>
          <input type="checkbox" onChange={this.handleSave.bind(null, userId, isWorkday, chosenDate)}/>
          {userId}
        </label>
      );
    }
  }
}
class Showups extends Component {
  constructor(props) {
   super(props);
   //set todays date
   var dt = getHumanDate(((new Date()).getTime())/1000);
   this.state = {chosenDate: dt, standins: {'standin':[], 'workday':[]}};

   this.changeDate = this.changeDate.bind(this);
 }
  componentDidMount() {
    this.getStandins();
  }
  changeDate(e){

    this.setState({chosenDate: e.target.value });
  }
  getStandins(){

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
  render() {
    const sins = this.state.standins.standin;
    const standins = sins.map((sin) =>
    <StandinElement key={sin.id} standinDayId={sin.id}
      standinUserId={sin.standin_user_id} chosenDate={this.state.chosenDate}
      isWorkday={false}
      />
  );

    return (
      <div>
        <Header />

          <h1>Show ups<small>gs</small></h1>
          <label>
            Choose date:
            <input type="date" onChange={this.changeDate} value={this.state.chosenDate} />
            <input type="button" onClick={this.getStandins.bind(this)} value="Get" />
          </label>
          {standins}

      </div>
    );
  }
}

export default Showups;
