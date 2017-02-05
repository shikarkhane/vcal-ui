import React, { Component } from 'react';
import CreateSummon from './CreateSummon';
import ListSummon from './ListSummon';
import Header from './Header';

class Summon extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Summon</h1>
        <CreateSummon />
        <ListSummon />
      </div>
    );
  }
}

export default Summon;
