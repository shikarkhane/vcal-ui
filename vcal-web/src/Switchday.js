import React, { Component } from 'react';
import SwitchdayMyList from './SwitchdayMyList';
import SwitchdayOpenList from './SwitchdayOpenList';

class Switchday extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>Switchday<small>gs</small></h1>
        <SwitchdayMyList />
        <SwitchdayOpenList />
      </div>
    );
  }
}

export default Switchday;
