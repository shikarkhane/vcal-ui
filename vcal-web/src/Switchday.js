import React, { Component } from 'react';
import SwitchdayComponent from './SwitchdayComponent';

class Switchday extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>Switchday<small>Gomorronsol</small></h1>
        <SwitchdayComponent />
        <SwitchdayComponent />
      </div>
    );
  }
}

export default Switchday;
