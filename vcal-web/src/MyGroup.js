import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';
import { hashHistory } from 'react-router';

class GroupElement extends Component{
  handleChooseGroup(groupId, groupName){
    localStorage.setItem("groupId", groupId);
    localStorage.setItem("groupName", groupName);
    hashHistory.push('/');
  }
  render(){
    var groupId = this.props.groupId;
    var groupName = this.props.groupName;
    const marginButtons = {
      marginRight: 5,
    };

    return (
      <button className="btn btn-primary btn-lg" type="button" style={marginButtons}
         onClick={this.handleChooseGroup.bind(null, groupId, groupName)}>
        {this.props.groupName}
      </button>
    );
  }
}
class MyGroup extends Component {
  constructor(props) {
   super(props);
   this.state = {groups: []};
 }
 componentDidMount() {
      this.getGroups();
  }
  getGroups(){
    var self = this;
       // todo: get list of groups user is member of
       reqwest({
           url: conf.serverUrl + '/group/'
           , type: 'json'
           , contentType: 'application/json'
         , method: 'get'
         , success: function (resp) {
             self.setState({groups: resp});
           }
       });
  }

  render() {
    const grps = this.state.groups;
    const groupButtons = grps.map((grp) =>
    <GroupElement key={grp.id} groupId={grp.id} groupName={grp.name} />
  );

    return (
      <div >
        <Header />
          <div className="panel panel-default">
            <div className="panel-heading">Select Group</div>
            <div className="panel-body">
              {groupButtons}
            </div>
          </div>
      </div>
    );
  }
}

export default MyGroup;
