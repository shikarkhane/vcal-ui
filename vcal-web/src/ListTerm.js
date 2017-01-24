import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class TermElement extends Component{
  handleChooseTerm(termId, termName){
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

      <div>
        <h3>{this.props.termName} ( {this.props.startDate} to {this.props.endDate} )
          - Total kids: {totalKids}</h3>
        <ul data-role="listview">
            <li>{fs["kid_1"]} families with 1 kids</li>
            <li>{fs["kid_2"]} families with 2 kids</li>
            <li>{fs["kid_3"]} families with 3 kids</li>
        </ul>
        <button onClick={this.handleChooseTerm.bind(null, termId, termName)}>
          Choose</button>
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
      startDate={tm.start_date} endDate={tm.end_date}
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
