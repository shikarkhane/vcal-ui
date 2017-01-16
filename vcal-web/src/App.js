import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import reqwest from 'reqwest';

import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.timerID = setInterval(
      () => this.checkTokenStillValid(),
      500000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  checkTokenStillValid() {
    if (Boolean(localStorage.getItem("is_auth")) === true)
    {
      reqwest({
          url: 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + localStorage.getItem("tokenId")
        , type: 'json'
        , method: 'get'
        , contentType: 'application/json'
        , done: function (resp) {
            var jr = JSON.parse(resp);
            if (Boolean(jr["email_verified"]) !== true){
              localStorage.setItem("is_auth", false);
            }
          }
      });
    }

    this.setState({
      date: new Date()
    });
  }

  render() {
    this.state = {is_auth: localStorage.getItem("is_auth")};
    var content = (
        <Landing />
    );

    if (Boolean(this.state.is_auth) === true)
    {
      content = (
          <Dashboard />
      );
    };

    return content;
  }
}

export default App;
