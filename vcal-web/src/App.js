import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    var is_auth = true;
    var content = (
        <Landing />
    );

    if (is_auth)
    {
      content = (
          <Dashboard />
      );
    };

    return content;
  }
}

export default App;
