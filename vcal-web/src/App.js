import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Well } from 'react-bootstrap';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Well>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Well>
      </div>
    );
  }
}

export default App;
