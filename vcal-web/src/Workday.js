import React, { Component } from 'react';
import CreateWorkday from './CreateWorkday';
import ListWorkday from './ListWorkday';
import Header from './Header';

class Workday extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Workday<small>gs</small></h1>
        <CreateWorkday />
        <ListWorkday />
      </div>
    );
  }
}

export default Workday;
