import React, { Component } from 'react';
import Authenticate from './Authenticate';

class Landing extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>landing <small>gs</small></h1>
        <Authenticate />
      </div>
    );
  }
}

export default Landing;
