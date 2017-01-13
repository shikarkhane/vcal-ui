import React, { Component } from 'react';
import reqwest from 'reqwest';

class Invite extends Component {
  handleSave(){
    var emails = 'nikhil@tinktime.com,n@g.com';
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
  render() {
    return (
      <div className="page-header">
        <h1>Invite <small>gs</small></h1>
        <textarea id="textarea-invitees" placeholder="separate emails by comma sign (,) "></textarea>
        <input type="button" value="Send invites" onClick={this.handleSave}/>
      </div>
    );
  }
}

export default Invite;
