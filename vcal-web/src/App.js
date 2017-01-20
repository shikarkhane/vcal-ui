import { conf } from './config';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import reqwest from 'reqwest';

import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    if ( Boolean(localStorage.getItem("is_auth")) === true){
      this.timerID = setInterval(
        () => this.checkTokenStillValid(),
        100000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  checkTokenStillValid() {
    if (Boolean(localStorage.getItem("is_auth")) === true)
    {
      reqwest({
          url: conf.googleTokenVerifyUrl + localStorage.getItem("tokenId")
        , type: 'json'
        , method: 'get'
        , contentType: 'application/json'
        , error: function (err) {
          localStorage.setItem("is_auth", 0);
          clearInterval(this.timerID);
        }
        , success: function (resp) {
          //var jr = JSON.parse(resp);
          console.log(resp);
        }
      });
    }

  }

  render() {
    var content = (
        <Landing />
    );

    if (Boolean(localStorage.getItem("is_auth")) === true)
    {
      content = (
          <Dashboard />
      );
    };

    return content;
  }
}

export default App;
