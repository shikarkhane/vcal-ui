import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class AdminUserAction extends Component{
  constructor(props) {
    super(props);
    this.state = {isRuleSet: false};
  }
  componentDidMount() {
    var isRuleSet = localStorage.getItem("isRuleSet") === '1' ? true : false;
    this.setState({isRuleSet: isRuleSet})
  }
  render(){
    //<ActionButton actionLinkName="invite" actionLabel="Invite" notifyCount="0"/>
    //<ActionButton actionLinkName="member" actionLabel="Member" notifyCount="0"/>

    return (
      <div>
        <h3>Admin actions</h3>
          <ActionButton actionLinkName="overview" actionLabel="Overview" notifyCount="0" disabled={!this.state.isRuleSet}/>
          <ActionButton actionLinkName="statistic" actionLabel="Statistic" notifyCount="0" disabled={!this.state.isRuleSet}/>
          <ActionButton actionLinkName="summon" actionLabel="Summon" notifyCount="0" disabled={!this.state.isRuleSet}/>
          <ActionButton actionLinkName="workday" actionLabel="Work day" notifyCount="0" disabled={!this.state.isRuleSet}/>
          <ActionButton actionLinkName="term" actionLabel="Term" notifyCount="0" disabled={false}/>
          <ActionButton actionLinkName="NoShowUps" actionLabel="Show-ups" notifyCount="0" disabled={!this.state.isRuleSet}/>
          <ActionButton actionLinkName="rule" actionLabel="Rule" notifyCount="0" disabled={false}/>
          <ActionButton actionLinkName="holidays" actionLabel="Holidays" notifyCount="0" disabled={false}/>
        <ActionButton actionLinkName="assign" actionLabel="Assign" notifyCount="0" disabled={false}/>
      </div>
    );
  }
}
class RegularUserAction extends Component{
  constructor(props) {
    super(props);
    this.state = {isRuleSet: false};
  }
  componentDidMount() {
    var isRuleSet = localStorage.getItem("isRuleSet") === '1' ? true : false;

    this.setState({isRuleSet: isRuleSet})
  }
  render(){
    return (
      <div>
        <h3>Actions</h3>
          <ActionButton actionLinkName="worksignup" actionLabel="Sign-up" notifyCount="0" disabled={!this.state.isRuleSet}/>
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

    if (this.props.disabled){
      return (
          <button className="btn btn-lg" type="button" style={marginButtons} disabled>
            {this.props.actionLabel}
          </button>
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
      return (
        <div>
          <AdminUserAction />
          <RegularUserAction />
        </div>
      );
  }
}

export default BodyBottom;
