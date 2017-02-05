import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class AdminUserAction extends Component{
  render(){
    return (
      <div>
        <h3>Admin actions</h3>
          <ActionButton actionLinkName="summon" actionLabel="Summon" notifyCount="0"/>
          <ActionButton actionLinkName="workday" actionLabel="Work day" notifyCount="0"/>
          <ActionButton actionLinkName="term" actionLabel="Term" notifyCount="0"/>
          <ActionButton actionLinkName="showups" actionLabel="Show-ups" notifyCount="0"/>
          <ActionButton actionLinkName="invite" actionLabel="Invite" notifyCount="0"/>
          <ActionButton actionLinkName="member" actionLabel="Member" notifyCount="0"/>
          <ActionButton actionLinkName="rule" actionLabel="Rule" notifyCount="0"/>
          <ActionButton actionLinkName="holidays" actionLabel="Holidays" notifyCount="0"/>
        <ActionButton actionLinkName="overview" actionLabel="Overview" notifyCount="0"/>
        <ActionButton actionLinkName="statistic" actionLabel="Statistic" notifyCount="0"/>
      </div>
    );
  }
}
class RegularUserAction extends Component{
  render(){
    return (
      <div>
        <h3>Actions</h3>
          <ActionButton actionLinkName="children" actionLabel="Children" notifyCount="0"/>
          <ActionButton actionLinkName="worksignup" actionLabel="Sign-up" notifyCount="0"/>
          <ActionButton actionLinkName="switchday" actionLabel="Switch day" notifyCount="0"/>
      </div>
    );
  }
}
class ActionButton extends Component{

  render(){
    const marginButtons = {
      marginRight: 5,
      marginTop: 5,
    };
    if (this.props.notifyCount > 0){
      return (
        <Link to={'/{this.props.actionLinkName}'}>
          <button className="btn btn-primary btn-lg" type="button" style={marginButtons}>
            {this.props.actionLabel} <span className="badge">{this.props.notifyCount}</span>
          </button>
        </Link>
      );
    }
    else{
      return (
        <Link to={'/' + this.props.actionLinkName}>
          <button className="btn btn-primary btn-lg" type="button" style={marginButtons}>
            {this.props.actionLabel}
          </button>
        </Link>
      );
    }
  }
}
class BodyBottom extends Component {
  render() {
    if ( Number(localStorage.getItem("role")) === 1){
      return (
        <div>
          <AdminUserAction />
          <RegularUserAction />
        </div>
      );
    }
    else{
      return (
        <RegularUserAction />
      );
    }
  }
}

export default BodyBottom;
