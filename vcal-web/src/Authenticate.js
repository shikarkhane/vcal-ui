import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleButton extends Component{
  render(){
    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <GoogleLogin
        clientId=".apps.googleusercontent.com"
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
        <h1>Authenticate<small>Gomorronsol</small></h1>
        <GoogleButton />
      </div>
    );
  }
}

export default Authenticate;
