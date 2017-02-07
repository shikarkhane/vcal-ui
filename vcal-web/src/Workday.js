import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import CreateWorkday from './CreateWorkday';
import ListWorkday from './ListWorkday';
import Header from './Header';

class Workday extends Component {
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
    this.getWorkdays();
  }
  getWorkdays(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    reqwest({
      url: conf.serverUrl + '/workday/' + groupId + '/'
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
        <h1>Workday</h1>
        <CreateWorkday onUpdate={this.onUpdate.bind(this)}/>
        <ListWorkday data={this.state.data}/>
      </div>
    );
  }
}

export default Workday;
