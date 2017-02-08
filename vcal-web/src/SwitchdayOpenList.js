import React, { Component } from 'react';
import SwitchTakeDate from './SwitchTakeDate';
import {getHumanDate}from './Utility';

class SwitchdayOpenList extends Component {

  render() {
    // todo intersect with mySwitchday and exclude from open list
    const standins = this.props.openStandin;
    const standinSwitches = standins.map((s) =>
    <SwitchTakeDate key={s.switch_date+s.id}
      chosenDate={s.switch_date} standinUserId={s.standin_user_id}
      displayDate={getHumanDate(s.switch_date)}
      fromTime="0800" tillTime="1600" isHalfDay={false}
      isWorkday={false} isAlreadySwitched={false}
      onTake={this.props.onTake}/>
    );
    const workdays = this.props.openWorkday;
    const workdaySwitches = workdays.map((s) =>
    <SwitchTakeDate key={s.switch_date+s.id} chosenDate={s.switch_date} standinUserId={s.standin_user_id}
      displayDate={getHumanDate(s.switch_date)}
      fromTime={s.from_time_in_24hours} tillTime={s.to_time_in_24hours}
      isHalfDay={s.is_half_day}  isWorkday={true}
      isAlreadySwitched={false}
      onTake={this.props.onTake}/>
  );

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">Open standin dates</div>
          <div className="panel-body">
            <div className="list-group">
              {standinSwitches}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">Open workday dates</div>
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

export default SwitchdayOpenList;
