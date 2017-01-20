import { conf } from './config';
import React, { Component } from 'react';
import reqwest from 'reqwest';

class SummonElement extends Component{
  handleDeleteSummon(summonId){
    reqwest({
        url: conf.serverUrl + '/summon/' + summonId + '/'
      , type: 'json'
      , method: 'delete'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({summons: resp});
        }
    });
  }
  render(){
    var summonId = this.props.summonId;

    return (
      <button onClick={this.handleDeleteSummon.bind(null, summonId)}>
        On {this.props.date} , stand-in needed between {this.props.fromTime}
        till  {this.props.tillTime}</button>
    );
  }
}

class ListSummon extends Component {
  constructor(props) {
   super(props);
   this.state = {summons: []};
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
          self.setState({summons: resp});
        }
    });
  }
  render() {
    const smons = this.state.summons;
    const summonButtons = smons.map((smon) =>
    <SummonElement key={smon.id} summonId={smon.id} date={smon.work_date}
      fromTime={smon.from_time_in_24hours} tillTime={smon.to_time_in_24hours}/>
  );

    return (
            <div>
                 {summonButtons}
            </div>

    );
  }
}

export default ListSummon;
