import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import CreateTerm from './CreateTerm';
import ListTerm from './ListTerm';
import Header from './Header';

class Term extends Component {
  constructor(props) {
   super(props);
   // todo: get list of active terms in the group
   this.state = {data: []};
 }
 onUpdate(newElement){
   var _data = this.state.data;
   _data.unshift(newElement);
   this.setState({ data : _data});

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
           self.setState({data: resp});
         }
     });
  }
  render() {
    return (
      <div>
        <Header />
        <h1>Term</h1>
        <CreateTerm onUpdate={this.onUpdate.bind(this)}/>
        <ListTerm data={this.state.data}/>
      </div>
    );
  }
}

export default Term;
