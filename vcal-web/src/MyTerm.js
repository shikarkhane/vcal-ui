import { conf } from './config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import { hashHistory } from 'react-router';

class TermElement extends Component{
  handleChooseTerm(termId, termName){
    localStorage.setItem("termId", termId);
    localStorage.setItem("termName", termName);
    hashHistory.push('/');
  }
  render(){
    var termId = this.props.termId;
    var termName = this.props.termName;

    return (
      <button onClick={this.handleChooseTerm.bind(null, termId, termName)}>
        {this.props.termName}</button>
    );
  }
}
class MyTerm extends Component {
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
    <TermElement key={tm.id} termId={tm.id} termName={tm.name} />
  );

    return (
      <div>
        <Header />
        <h1>Term </h1>
        {termButtons}
      </div>
    );
  }
}

export default MyTerm;
