import React, { Component } from 'react';

class GroupElement extends Component{
  handleChooseGroup(groupId, groupName){
    localStorage.setItem("groupId", groupId);
    localStorage.setItem("groupName", groupName);
  }
  render(){
    var groupId = this.props.groupId;
    var groupName = this.props.groupName;

    return (
      <button onClick={this.handleChooseGroup.bind(null, groupId, groupName)}>
        {this.props.groupName}</button>
    );
  }
}
class Group extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>Group </h1>
        <GroupElement groupId="1" groupName="Gomorronsol" />
        <GroupElement groupId="2" groupName="Nest" />
        <GroupElement groupId="3" groupName="Ogolo" />
      </div>
    );
  }
}

export default Group;
