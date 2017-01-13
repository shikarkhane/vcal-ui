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
    var groupId = 1;
     // todo: get list of terms for given group id
     reqwest({
         url: 'http://localhost:8080/term_details/' + groupId + '/'
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
      <div className="page-header">
        <h1>Term </h1>
        {termButtons}
      </div>
    );
  }
}

export default MyTerm;
