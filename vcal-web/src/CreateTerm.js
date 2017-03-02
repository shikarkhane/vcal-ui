import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {makeId}from './Utility';
import Feedback from './Feedback';

class CreateSummon extends Component {
  constructor(props) {
   super(props);
   this.state = {createDisabled: false, termName: '',
       feedbackMessage:"", displayAlert: false};

   this.changeTerm = this.changeTerm.bind(this);
   this.changeStartDate = this.changeStartDate.bind(this);
   this.changeEndDate = this.changeEndDate.bind(this);
   this.changeKid1 = this.changeKid1.bind(this);
   this.changeKid2 = this.changeKid2.bind(this);
   this.changeKid3 = this.changeKid3.bind(this);
   this.handleSave = this.handleSave.bind(this);

 }

  changeTerm(e){
    this.setState({termName: e.target.value });
  }
  changeStartDate(e){
    this.setState({startDate: e.target.value });
  }
  changeEndDate(e){
    this.setState({endDate: e.target.value });
  }
  changeKid1(e){
    this.setState({kid1: e.target.value });
  }
  changeKid2(e){
    this.setState({kid2: e.target.value });
  }
  changeKid3(e){
    this.setState({kid3: e.target.value });
  }

  handleSave(e){
    e.preventDefault();
    var self = this;
      this.setState({createDisabled: true });
    var startDt = Math.floor(((new Date(this.state.startDate)).getTime())/1000);
    var endDt = Math.floor(((new Date(this.state.endDate)).getTime())/1000);

    var groupId = localStorage.getItem("groupId");
    //var creatorId = localStorage.getItem("userId");
    var fspread = {kid_1: this.state.kid1, kid_2: this.state.kid2,
      kid_3: this.state.kid3};
    var jsonBody = { group_id: groupId,
        term_name: this.state.termName, start_date: startDt,
        end_date: endDt,
         family_spread: JSON.stringify(fspread), id: makeId()};
    reqwest({
        url: conf.serverUrl + '/term/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ group_id: groupId,
          term_name: this.state.termName, start_date: startDt,
          end_date: endDt,
           family_spread: {kid_1: this.state.kid1, kid_2: this.state.kid2,
             kid_3: this.state.kid3}})
      , success: function (resp) {
          //console.log(resp);
            if (resp.status === 'ok'){
                jsonBody.id = resp.id;
                self.props.onUpdate(jsonBody);
                self.setState({feedbackMessage : resp.message});
                self.setState({displayAlert: true});

            }
        }
    });
      reqwest({
          url: conf.serverUrl + '/standindayrange/'
          , type: 'json'
          , method: 'post'
          , contentType: 'application/json'
          , data: JSON.stringify({ group_id: groupId,
              start_date: startDt,  end_date: endDt})
          , success: function (resp) {
              //console.log(resp);

          }
      });

  }
  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSave}>
        <Feedback displayAlert={this.state.displayAlert} message={this.state.feedbackMessage} />

        <div className="form-group">
          <label htmlFor="inputName1" className="col-sm-2 control-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputName1"
                onChange={this.changeTerm} value={this.state.termName}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDate1" className="col-sm-2 control-label">Start Date</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="inputDate1"
                onChange={this.changeStartDate} value={this.state.startDate}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDate2" className="col-sm-2 control-label">End Date(inclusive)</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="inputDate2"
                onChange={this.changeEndDate} value={this.state.endDate}/>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label">Count of Families with </label>
          <div className="row">
              <div className="col-xs-4 col-md-4">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">1 kid</span>
                    <input type="number"  placeholder="1 kid"  className="form-control"
                    onChange={this.changeKid1} value={this.state.kid1} aria-describedby="basic-addon1"/>
                </div>
            </div>
              <div className="col-xs-4 col-md-4">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon2">2 kids</span>
                    <input type="number"  placeholder="2 kids"  className="form-control"
                    onChange={this.changeKid2} value={this.state.kid2} aria-describedby="basic-addon2"/>
                </div>
            </div>
              <div className="col-xs-4 col-md-4">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon3">3 kids</span>
                    <input type="number"  placeholder="3 kids"  className="form-control"
                    onChange={this.changeKid3} value={this.state.kid3} aria-describedby="basic-addon3"/>
                </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled={this.state.createDisabled}>
                Create</button>
          </div>
        </div>
      </form>

    );
  }
}

export default CreateSummon;
