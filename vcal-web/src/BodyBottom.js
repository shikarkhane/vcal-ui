import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Summon from './Summon';
import Workday from './Workday';
import Term from './Term';
import ShowUps from './ShowUps';
import Invite from './Invite';
import Member from './Member';
import Rule from './Rule';
import Children from './Children';
import WorkSignUp from './WorkSignUp';
import SwitchDay from './Switchday';

class BodyBottom extends Component {
  handlerSummon() {
    ReactDOM.render(
      <Summon />,
      document.getElementById('root')
    );
  }
  handlerWorkDay() {
    ReactDOM.render(
      <Workday />,
      document.getElementById('root')
    );
  }
  handlerTerm() {
    ReactDOM.render(
      <Term />,
      document.getElementById('root')
    );
  }
  handlerShowUps() {
    ReactDOM.render(
      <ShowUps />,
      document.getElementById('root')
    );
  }
  handlerInvite() {
    ReactDOM.render(
      <Invite />,
      document.getElementById('root')
    );
  }
  handlerMember() {
    ReactDOM.render(
      <Member />,
      document.getElementById('root')
    );
  }
  handlerRule() {
    ReactDOM.render(
      <Rule />,
      document.getElementById('root')
    );
  }
  handlerChildren() {
    ReactDOM.render(
      <Children />,
      document.getElementById('root')
    );
  }
  handlerSignUp() {
    ReactDOM.render(
      <WorkSignUp />,
      document.getElementById('root')
    );
  }
  handlerSwitchDay() {
    ReactDOM.render(
      <SwitchDay />,
      document.getElementById('root')
    );
  }
  render() {
    return (
      <div className="page-header">
        <h1>BodyBottom<small>gs</small></h1>
        <button onClick={this.handlerSummon}>summon</button>
        <button onClick={this.handlerWorkDay}>Work day</button>
        <button onClick={this.handlerTerm}>Term</button>
        <button onClick={this.handlerShowUps}>Show-ups</button>
        <button onClick={this.handlerInvite}>Invite</button>
        <button onClick={this.handlerMember}>Member</button>
        <button onClick={this.handlerRule}>Rule</button>
        <button onClick={this.handlerChildren}>Children</button>
        <button onClick={this.handlerSignUp}>Sign-up</button>
        <button onClick={this.handlerSwitchDay}>Switch day</button>
      </div>
    );
  }
}

export default BodyBottom;
