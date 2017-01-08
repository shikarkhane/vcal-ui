import React, { Component } from 'react';
import CreateSummon from './CreateSummon';
import ListSummon from './ListSummon';

class Summon extends Component {
  render() {
    return (
      <div>
        <h1>Summon<small>Gomorronsol</small></h1>
        <CreateSummon />
        <ListSummon />
      </div>
    );
  }
}

export default Summon;
