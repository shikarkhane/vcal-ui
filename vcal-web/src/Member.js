import React, { Component } from 'react';
import reqwest from 'reqwest';
class MemberElement extends Component{
  render(){
    var memberId = this.props.memberId;
    var email = this.props.memberEmail;
    var userLabel = this.props.memberName;
    if (userLabel.length === 0){
      userLabel = email;
    }
    return (
      <li onClick={this.props.onClick.bind(null, memberId, email)} >{userLabel}</li>
    );
  }
}
class Member extends Component {
  constructor(props) {
   super(props);
   this.state = {members: []};
 }
 componentDidMount() {
      this.getMembers();
  }
  getMembers(){
    var self = this;
    var groupId = 1;
       // todo: get list of groups user is member of
       reqwest({
           url: 'http://localhost:8080/member/' + groupId + '/'
           , type: 'json'
           , contentType: 'application/json'
         , method: 'get'
         , success: function (resp) {
             self.setState({members: resp});
           }
       });
  }

  handleAction(memberId, email){
    // e.preventDefault();
    console.log('take action after member click, delete or reminder');

  }
  render() {
    const ms = this.state.members;
    const memberItems = ms.map((m) =>
    <MemberElement key={m.id} memberId={m.id} memberName={m.name}
      memberEmail={m.email} onClick={this.handleAction}/>
    );

    return (
      <div className="page-header">
        <h1>Member <small>gs</small></h1>
          <ul >
            {memberItems}
          </ul>
      </div>
    );
  }
}

export default Member;
