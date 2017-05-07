import React, { Component } from 'react';
import Authenticate from './Authenticate';

class Landing extends Component {
  render() {
    return (
      <div className="page-header">
        <Authenticate />
      </div>
    );
  }
}

export default Landing;
