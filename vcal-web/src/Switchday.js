import React, { Component } from 'react';
import SwitchdayList from './SwitchdayList';

class Switchday extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>Switchday<small>gs</small></h1>
        <SwitchdayList />
      </div>
    );
  }
}

export default Switchday;
