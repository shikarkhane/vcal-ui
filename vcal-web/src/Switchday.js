import { conf } from './config';
import React, { Component } from 'react';
import SwitchdayMyList from './SwitchdayMyList';
import SwitchdayOpenList from './SwitchdayOpenList';
import Header from './Header';

class Switchday extends Component {
  render() {
    return (
      <div >
        <Header />
        <h1>Switchday<small>gs</small></h1>
        <SwitchdayMyList />
        <SwitchdayOpenList />
      </div>
    );
  }
}

export default Switchday;
