import { conf } from './Config';
import React, { Component } from 'react';
import CreateTerm from './CreateTerm';
import ListTerm from './ListTerm';
import Header from './Header';

class Term extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Term<small>gs</small></h1>
        <CreateTerm />
        <ListTerm />
      </div>
    );
  }
}

export default Term;
