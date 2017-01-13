import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleButton extends Component{
  render(){
    const responseGoogle = (response) => {
      console.log(response);
      if (response.type !== "tokenFailed"){
        localStorage.setItem("tokenId", response.tokenId);
        localStorage.setItem("profileObj", response.profileObj);
        localStorage.setItem("is_auth", true);
      }
    }

    return (
      <GoogleLogin
        clientId="50349381828-.apps.googleusercontent.com"
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
        <h1>Authenticate<small>gs</small></h1>
        <GoogleButton />
      </div>
    );
  }
}

export default Authenticate;
