import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import CreateSummon from './CreateSummon';
import ListSummon from './ListSummon';
import Header from './Header';

class Summon extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  onUpdate(newElement){
    var _data = this.state.data;
    _data.unshift(newElement);
    this.setState({ data : _data});
  }
  componentDidMount() {
       this.getSummons();
   }
   getSummons(){
     var self = this;
     var groupId = localStorage.getItem("groupId");
     reqwest({
         url: conf.serverUrl + '/summon/' + groupId + '/'
       , type: 'json'
       , method: 'get'
       , contentType: 'application/json'
       , success: function (resp) {
           self.setState({data: resp});
         }
     });
   }
  render() {
    return (
      <div>
        <Header />
        <h1>Summon</h1>
        <CreateSummon onUpdate={this.onUpdate.bind(this)}/>
        <ListSummon data={this.state.data}/>
      </div>
    );
  }
}

export default Summon;
