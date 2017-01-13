import React, { Component } from 'react';
import reqwest from 'reqwest';

class Invite extends Component {
  constructor(props) {
   super(props);
   this.state = {invitees:[]};

   this.changeInvitees = this.changeInvitees.bind(this);
   this.handleSave = this.handleSave.bind(this);

 }
  handleSave(e){
    e.preventDefault();
    var emails = this.state.invitees;
    var group_id = 1;
    reqwest({
        url: 'http://localhost:8080/invite/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ group_id: group_id, emails: emails })
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  changeInvitees(e){
    var i = e.target.value.split(',');
    this.setState({invitees: i });
  }
  render() {
    return (
      <form onSubmit={this.handleSave}>
        <h1>Invite <small>gs</small></h1>
        <textarea placeholder="separate emails by comma sign (,) "
          onChange={this.changeInvitees} value={this.state.invitees} ></textarea>
        <input type="button" value="Send invites" onClick={this.handleSave}/>
      </form>
    );
  }
}

export default Invite;
