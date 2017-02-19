import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import {getHumanDate, makeId, isFutureDate}from './Utility';

class HolidayElement extends Component{
    constructor(props) {
        super(props);
        this.handleDeleteHoliday = this.handleDeleteHoliday.bind(this);
        this.state = {disabled: false};
    }
    handleDeleteHoliday(holidayId){
        this.setState({disabled: true });
        reqwest({
            url: conf.serverUrl + '/holiday/' + holidayId + '/'
            , type: 'json'
            , method: 'delete'
            , contentType: 'application/json'
            , success: function (resp) {
                //console.log(resp);
            }
        });
    }
    render(){
        var holidayId = this.props.holidayId;

        return (
            <div className="alert alert-success" role="alert">
             {this.props.date}

                <button type="button" className="btn btn-warning pull-right" disabled={this.state.disabled}
                    onClick={this.handleDeleteHoliday.bind(this, holidayId)} >
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>
    );
    }
}

class Holidays extends Component {
  constructor(props) {
   super(props);
   this.state = {holidayDate: "", holidayDates: []};

   this.changeDate = this.changeDate.bind(this);
   this.handleSave = this.handleSave.bind(this);

 }

  changeDate(e){
    this.setState({holidayDate: e.target.value });
  }
    componentDidMount() {
        this.getHolidays();
    }
    getHolidays(){
        var self = this;
        var groupId = localStorage.getItem("groupId");

        // todo: get list of terms for given group id
        reqwest({
            url: conf.serverUrl + '/holiday/' + groupId + '/'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , success: function (resp) {
                self.setState({holidayDates: resp });
            }
        });
    }
  handleSave(e){
    e.preventDefault();
      var self = this;
    var groupId = localStorage.getItem("groupId");
    var creatorId = localStorage.getItem("userId");
    var holidayDate = Math.floor(((new Date(this.state.holidayDate)).getTime())/1000);
    reqwest({
        url: conf.serverUrl + '/holiday/' + groupId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ created_by_id: creatorId, holiday_date: holidayDate})
      , success: function (resp) {
          //console.log(resp);
            var hds = self.state.holidayDates;
            hds.unshift({"holiday_date": holidayDate, "id": makeId()});
            self.setState({holidayDates: hds});
        }
    });
  }
  render() {
      const hds = this.state.holidayDates;
      const holidayButtons = hds
              .filter(function(s) { return isFutureDate(s.holiday_date); })
              .map((hd) =>
          <HolidayElement key={hd.holiday_date +hd.id} holidayId={hd.id}
      date={getHumanDate(hd.holiday_date)}/>
  );

    return (
        <div>
            <Header />
            <h1>Public Holidays </h1>
            <label htmlFor="basic-url">Enter public holidays</label>

            <form onSubmit={this.handleSave}>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon3">Date</span>
                        <input type="date" className="form-control" id="inputDate1"
                            onChange={this.changeDate} value={this.state.holidayDate} aria-describedby="basic-addon3"/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" onClick={this.handleSave.bind(this)} type="button">Add</button>
                        </span>
                    </div>
                </div>
            </form>
          {holidayButtons}
        </div>
    );
  }
}

export default Holidays;
