import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import getHumanDate from './Utility';

class TermElement extends Component{
  handleEditTerm(termId, termName){
    localStorage.setItem("termId", termId);
    localStorage.setItem("termName", termName);
  }
  render(){
    var termId = this.props.termId;
    var termName = this.props.termName;
    var fs = JSON.parse(this.props.familySpread);
    const totalKids = Number(fs["kid_1"]) *1 + Number(fs["kid_2"]) *2
    + Number(fs["kid_3"]) *3;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.termName} ( {this.props.startDate} to {this.props.endDate} )</div>
        <div className="panel-body">
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge">{fs["kid_1"]}</span>
            Families with 1 kids
            </li>
            <li className="list-group-item">
              <span className="badge">{fs["kid_2"]}</span>
              families with 2 kids
            </li>
            <li className="list-group-item">
              <span className="badge">{fs["kid_3"]}</span>
              families with 3 kids
            </li>
          </ul>
        </div>
        <div className="panel-footer">Total kids
          <span className="badge">{totalKids}</span>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default pull-right"
                  onClick={this.handleEditTerm.bind(null, termId, termName)}>
                  Choose</button>
              </div>
            </div>
            </div>
      </div>

    );
  }
}

class ListTerm extends Component {
  constructor(props) {
   super(props);
   // todo: get list of active terms in the group
   this.state = {terms: []};
 }
 componentDidMount() {
      this.getTerms();
  }
  getTerms(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
     // todo: get list of terms for given group id
     reqwest({
         url: conf.serverUrl + '/term_details/' + groupId + '/'
         , type: 'json'
         , contentType: 'application/json'
       , method: 'get'
       , success: function (resp) {
           self.setState({terms: resp});
         }
     });
  }
  render() {
    const tms = this.state.terms;
    const termButtons = tms.map((tm) =>
    <TermElement key={tm.id} termId={tm.id} termName={tm.name}
      startDate={getHumanDate(tm.start_date)} endDate={getHumanDate(tm.end_date)}
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
