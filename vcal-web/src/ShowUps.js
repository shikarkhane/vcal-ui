import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import {getDateFormat} from './Utility';


class StandinElement extends Component{
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {disabled: false};
    }
  handleSave(userId, isWorkday, chosenDate){
      this.setState({disabled: true });
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
      var isChosen = "list-group-item " + (this.state.disabled ? 'list-group-item-success' : '');

    if (userId === null){
      return null;
    }
    else{
      return (
          <button type="button" className={isChosen}
                onClick={this.handleSave.bind(null, userId, isWorkday, chosenDate)} disabled={this.state.disabled}>
                {userId}
            </button>
      );
    }
  }
}
class Showups extends Component {
  constructor(props) {
   super(props);
   //set todays date
   var dt = getDateFormat(((new Date()).getTime())/1000);
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
  const ws = this.state.standins.workday;
  const wdays = ws.map((sin) =>
  <StandinElement key={sin.id} standinDayId={sin.id}
    standinUserId={sin.standin_user_id} chosenDate={this.state.chosenDate}
    isWorkday={true}
    />
);

    return (
      <div>
        <Header />
        <h1>Show ups<small>gs</small></h1>

          <div className="row">
            <div className="col-xs-12 col-lg-6">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Choose date:</span>
                    <input type="date" className="form-control" onChange={this.changeDate}
                        aria-describedby="basic-addon1" value={this.state.chosenDate} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={this.getStandins.bind(this)} type="button">Get!</button>
                    </span>
                </div>
             </div>
            </div>

          <div className="panel panel-default">
                  <div className="panel-heading">Users who were standin</div>
              <div className="panel-body">
                  <div className="list-group">
                  {standins}
                  </div>
                  </div>
                  </div>
          <div className="panel panel-default">
                  <div className="panel-heading">Users who had workday</div>
              <div className="panel-body">
                  <div className="list-group">
                  {wdays}
                  </div>
                  </div>
                  </div>
      </div>
    );
  }
}

export default Showups;
