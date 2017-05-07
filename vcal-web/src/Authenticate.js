import { conf } from './Config';
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import {hashHistory} from 'react-router';
import reqwest from 'reqwest';

class GoogleButton extends Component{
  handleAuthenticatedUser(){
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
  isUserDomainApproved(email){
    if ( email.split('@')[1] === 'gomorronsol.net'){
      return true;
    }
    else{
      return false;
    }
    return false;
  }
  setGroupCookieToGomorronsol(){
    reqwest({
      url: conf.serverUrl + '/group/'
      , type: 'json'
      , contentType: 'application/json'
      , method: 'get'
      , success: function (resp) {
          var g = (resp.find(x => x.domain === "gomorronsol.net"));
        if (g){
          localStorage.setItem("groupId", g.id);
          localStorage.setItem("groupName", g.name);
          localStorage.setItem("defaultTermId", g.default_term_id);
          localStorage.setItem("termId", g.default_term_id);

          reqwest({
            url: conf.serverUrl + '/term_details/' + g.id + '/'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , success: function (resp) {
              localStorage.setItem("allTerms", JSON.stringify(resp));
            }
          });
        }
      }
    });
  }
  render(){
    var self = this;
    const responseGoogle = (response) => {
      //console.log(response);
      if (this.isUserDomainApproved(response.profileObj.email)){
        this.setGroupCookieToGomorronsol();
        localStorage.setItem("tokenId", response.tokenId);
        localStorage.setItem("profileObj", JSON.stringify(response.profileObj));
        localStorage.setItem("is_auth", 1);
        self.handleAuthenticatedUser();
      }
      else{
        localStorage.clear();
        hashHistory.push('/');
      }
    }

    return (
      <GoogleLogin
        clientId={conf.googleClientId}
        buttonText="Login"
        hostedDomain="gomorronsol.net"
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
        <GoogleButton />
      </div>
    );
  }
}

export default Authenticate;
