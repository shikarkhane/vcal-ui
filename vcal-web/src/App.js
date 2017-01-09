import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {is_auth: localStorage.getItem("is_auth")};
  }
  render() {

    var content = (
        <Landing />
    );

    if (this.state.is_auth)
    {
      content = (
          <Dashboard />
      );
    };

    return content;
  }
}

export default App;
