import React, { Component } from 'react';

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
   this.state = {date: new Date()};
 }
  render() {
    return (
      <div className="page-header">
        <h1>Term </h1>
        <TermElement termId="1" termName="ht2016" />
        <TermElement termId="2" termName="vt2017" />
      </div>
    );
  }
}

export default MyTerm;
