import React, { Component } from 'react';
import CreateTerm from './CreateTerm';
import ListTerm from './ListTerm';

class Term extends Component {
  render() {
    return (
      <div>
        <h1>Term<small>gs</small></h1>
        <CreateTerm />
        <ListTerm />
      </div>
    );
  }
}

export default Term;
