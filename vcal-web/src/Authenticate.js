import { conf } from './Config';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import {hashHistory} from 'react-router';
import reqwest from 'reqwest';

class GoogleButton extends Component{
  handleUserSave(){
    var profileObj = JSON.parse(localStorage.getItem("profileObj"));
    var tokenId = localStorage.getItem("tokenId");

    reqwest({
        url: conf.serverUrl + '/user/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({
        name: profileObj.name, givenName: profileObj.givenName,
        familyName: profileObj.familyName, email: profileObj.email,
        tokenId: tokenId, imageUrl: profileObj.imageUrl
      })
      , error: function (err) {
        //console.log(err);
        localStorage.clear();
        hashHistory.push('/');
      }
      , success: function (resp) {
          //console.log(resp);
          localStorage.setItem("userId", resp.userId);
          localStorage.setItem("role", resp.role);
          localStorage.setItem("isActive", resp.isActive);
          hashHistory.push('/dashboard');
        }
    });
  }
  render(){
    var self = this;
    const responseGoogle = (response) => {
      //console.log(response);
      if (response.type !== "tokenFailed"){
        localStorage.setItem("tokenId", response.tokenId);
        localStorage.setItem("profileObj", JSON.stringify(response.profileObj));
        localStorage.setItem("is_auth", 1);
        self.handleUserSave();
      }
    }

    return (
      <GoogleLogin
        clientId={conf.googleClientId}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    );
  }
}
class Authenticate extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>Authenticate</h1>
        <GoogleButton />
      </div>
    );
  }
}

export default Authenticate;
