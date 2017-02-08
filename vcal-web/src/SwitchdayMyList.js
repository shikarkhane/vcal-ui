import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import SwitchMyDate from './SwitchMyDate';
import {getHumanDate}from './Utility';

class SwitchdayMyList extends Component {
  markAlreadySwitched(chosenDate){
    //var self = this;
    var mySwitchDates = this.props.mySwitchday.map((x) => x.switch_date);
    for(var i = 0; i < mySwitchDates.length; i++) {
      if ( chosenDate === mySwitchDates[i]){
        return true;
      }
    }
    return false;
  }
  render() {

    // todo intersect with mySwitchday and mark check boxs
    const standins = this.props.myStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchMyDate key={s.id}
      chosenDate={s.standin_date}
      displayDate={getHumanDate(s.standin_date)}
      fromTime="0800" tillTime="1600" isHalfDay={false} isWorkday={false}
      isAlreadySwitched={this.markAlreadySwitched(s.standin_date)}
      onSwitch={this.props.onSwitch}/>
    );
    const workdays = this.props.myWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchMyDate key={s.id}
      chosenDate={s.work_date}
      displayDate={getHumanDate(s.work_date)}
      fromTime={s.from_time_in_24hours} tillTime={s.to_time_in_24hours}
      isHalfDay={s.is_half_day}  isWorkday={true}
      isAlreadySwitched={this.markAlreadySwitched(s.work_date)}
      onSwitch={this.props.onSwitch}/>
  );

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Your standin dates</div>
          <div className="panel-body">
            <div className="list-group">
              {standinSwitches}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Your workday dates</div>
          <div className="panel-body">
            <div className="list-group">
              {workdaySwitches}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SwitchdayMyList;
