import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
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
