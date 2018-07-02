import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import {getHumanDate, isFutureDate, isInChosenTerm} from './Utility';


class SummonElement extends Component{
    constructor(props) {
        super(props);
        this.handleDeleteSummon = this.handleDeleteSummon.bind(this);
        this.state = {disabled: false};
    }
  handleDeleteSummon(summonId){
      this.setState({disabled: true });
    reqwest({
        url: conf.serverUrl + '/summon/' + summonId + '/'
      , type: 'json'
      , method: 'delete'
      , contentType: 'application/json'
      , success: function (resp) {
          //console.log(resp);
        }
    });
  }
  render(){
    var summonId = this.props.summonId;

    return (
      <div className="alert alert-success" role="alert">
        On {this.props.date} , stand-in needed between {this.props.fromTime}
        till  {this.props.tillTime}

          <button type="button" className="btn btn-warning float-right" disabled={this.state.disabled}
              onClick={this.handleDeleteSummon.bind(this, summonId)} >
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
      </div>
    );
  }
}

class ListSummon extends Component {

  render() {
    const smons = this.props.data;
    const summonButtons = smons
            .filter(function(s) { return isFutureDate(s.work_date); })
            .filter(function (s) { return isInChosenTerm(s.work_date); })
            .map((smon) =>
    <SummonElement key={smon.work_date+smon.id} summonId={smon.id}
      date={getHumanDate(smon.work_date)}
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
