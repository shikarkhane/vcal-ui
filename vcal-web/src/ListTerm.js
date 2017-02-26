import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate, getDateFormat}from './Utility';

class TermElement extends Component{
  constructor(props) {
    super(props);

    var fs = JSON.parse(this.props.familySpread);

    this.state = {kid1: Number(fs["kid_1"]),
      kid2: Number(fs["kid_2"]),
      kid3: Number(fs["kid_3"]),
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    editMode: false};

    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);

    this.changeKid1 = this.changeKid1.bind(this);
    this.changeKid2 = this.changeKid2.bind(this);
    this.changeKid3 = this.changeKid3.bind(this);

    this.handleEditTerm = this.handleEditTerm.bind(this);

  }
  changeStartDate(e){
    var sd = Math.floor(((new Date(e.target.value)).getTime())/1000);
    this.setState({startDate: sd });
  }
  changeEndDate(e){
    var ed = Math.floor(((new Date(e.target.value)).getTime())/1000);
    this.setState({endDate: ed });
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


  handleEditTerm(e){
    e.preventDefault();
    var currentMode = this.state.editMode;

    var groupId = localStorage.getItem("groupId");
    var startDt = (new Date(this.state.startDate)).getTime();
    var endDt = (new Date(this.state.endDate)).getTime();


    if ( currentMode ){
      // currentMode=True means update and save changes for the term
      reqwest({
        url: conf.serverUrl + '/term/' + this.props.termId + '/'
        , type: 'json'
        , method: 'put'
        , contentType: 'application/json'
        , data: JSON.stringify({
          start_date: startDt,
          end_date: endDt,
          family_spread: {kid_1: this.state.kid1, kid_2: this.state.kid2,
            kid_3: this.state.kid3}})
        , success: function (resp) {
          //console.log(resp);
          if (resp.status === 'ok'){
            console.log('term updated');

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
          console.log(resp);
        }
      });
    }

    this.setState({editMode: !currentMode});
  }
  render(){
    var termId = this.props.termId;
    var termName = this.props.termName;
    var fs = JSON.parse(this.props.familySpread);
    const totalKids = this.state.kid1 *1 + this.state.kid2 *2 + this.state.kid3 *3;

    var buttonText = "Edit";
    if ( this.state.editMode ){
      buttonText = "Update & notify";
    }

    return (
        <form className="form-horizontal" onSubmit={this.handleEditTerm}>
      <div className="panel panel-default">
        <div className="panel-heading"><h3>{this.props.termName}</h3>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon5">Start Date</span>
                <input type="date" className="form-control" id="inputDate1" aria-describedby="basic-addon5"
            onChange={this.changeStartDate} value={getDateFormat(this.state.startDate)} disabled={!this.state.editMode}/>
            </div>
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon6">End Date(incl)</span>
                <input type="date" className="form-control" id="inputDate2" aria-describedby="basic-addon6"
            onChange={this.changeEndDate} value={getDateFormat(this.state.endDate)} disabled={!this.state.editMode}/>
            </div>
    </div>
        <div className="panel-body">
        <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">Families with 1 kids</span>
          <input type="number"  className="form-control"
          onChange={this.changeKid1} value={this.state.kid1} aria-describedby="basic-addon1"
    disabled={!this.state.editMode}/>
        </div>
        <div className="input-group">
              <span className="input-group-addon" id="basic-addon2">Families with 2 kids</span>
          <input type="number"  className="form-control"
          onChange={this.changeKid2} value={this.state.kid2} aria-describedby="basic-addon2"
    disabled={!this.state.editMode}/>
        </div>
        <div className="input-group">
              <span className="input-group-addon" id="basic-addon3">Families with 3 kids</span>
          <input type="number"  className="form-control"
          onChange={this.changeKid3} value={this.state.kid3} aria-describedby="basic-addon3"
    disabled={!this.state.editMode}/>
        </div>
        </div>
        <div className="panel-footer">Total kids
          <span className="badge">{totalKids}</span>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default pull-right">
        {buttonText}</button>
              </div>
            </div>
            </div>
      </div>
    </form>
    );
  }
}

class ListTerm extends Component {
  render() {
    const tms = this.props.data;
    const termButtons = tms.map((tm) =>
    <TermElement key={tm.id} termId={tm.id} termName={tm.name}
      startDate={tm.start_date} endDate={tm.end_date}
      displayStartDate={getHumanDate(tm.start_date)} displayEndDate={getHumanDate(tm.end_date)}
      familySpread={tm.family_spread}/>
  );

    return (
      <div >
          {termButtons}
      </div>

    );
  }
}

export default ListTerm;
