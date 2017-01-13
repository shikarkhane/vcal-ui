import React, { Component } from 'react';
import SwitchdayComponent from './SwitchdayComponent';

class Switchday extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>Switchday<small>gs</small></h1>
        <SwitchdayComponent headerCaption="Mark days to switch"/>
        <SwitchdayComponent headerCaption="Open pool - pick dates which others want to switch"/>
      </div>
    );
  }
}

export default Switchday;
