import { conf } from './config';
import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class ActionButton extends Component{
  render(){
    if (this.props.notifyCount > 0){
      return (
        <Link to={'/{this.props.actionLinkName}'}>
          <button className="btn btn-primary" type="button">
            {this.props.actionLabel} <span className="badge">{this.props.notifyCount}</span>
          </button>
        </Link>
      );
    }
    else{
      return (
        <Link to={'/' + this.props.actionLinkName}>
          <button className="btn btn-primary" type="button">
            {this.props.actionLabel}
          </button>
        </Link>
      );
    }
  }
}
class BodyBottom extends Component {
  render() {
    return (
      <div>
        <h1>BodyBottom<small>gs</small></h1>
        <ActionButton actionLinkName="summon" actionLabel="Summon" notifyCount="0"/>
        <ActionButton actionLinkName="workday" actionLabel="Work day" notifyCount="0"/>
        <ActionButton actionLinkName="term" actionLabel="Term" notifyCount="0"/>
        <ActionButton actionLinkName="showups" actionLabel="Show-ups" notifyCount="0"/>
        <ActionButton actionLinkName="invite" actionLabel="Invite" notifyCount="0"/>
        <ActionButton actionLinkName="member" actionLabel="Member" notifyCount="0"/>
        <ActionButton actionLinkName="rule" actionLabel="Rule" notifyCount="0"/>
        <ActionButton actionLinkName="children" actionLabel="Children" notifyCount="0"/>
        <ActionButton actionLinkName="worksignup" actionLabel="Sign-up" notifyCount="0"/>
        <ActionButton actionLinkName="switchday" actionLabel="Switch day" notifyCount="0"/>
      </div>
    );
  }
}

export default BodyBottom;
