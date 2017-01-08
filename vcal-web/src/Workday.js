import React, { Component } from 'react';
import CreateWorkday from './CreateWorkday';
import ListWorkday from './ListWorkday';

class Workday extends Component {
  render() {
    return (
      <div>
        <h1>Workday<small>Gomorronsol</small></h1>
        <CreateWorkday />
        <ListWorkday />
      </div>
    );
  }
}

export default Workday;
