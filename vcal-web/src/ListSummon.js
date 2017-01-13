import React, { Component } from 'react';
import reqwest from 'reqwest';

class SummonElement extends Component{
  handleDeleteSummon(termId){
    reqwest({
        url: 'http://localhost:8080/summon/' + termId + '/'
      , type: 'json'
      , method: 'delete'
      , contentType: 'application/json'
      , success: function (resp) {
          self.setState({summons: resp});
        }
    });
  }
  render(){
    var termId = this.props.termId;

    return (
      <button onClick={this.handleDeleteSummon.bind(null, termId)}>
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
    var groupId = 1;
    reqwest({
        url: 'http://localhost:8080/summon/' + groupId + '/'
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
    <SummonElement key={smon.id} termId={smon.id} date={smon.work_date}
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
