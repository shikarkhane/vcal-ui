import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Summon from './Summon';

class BodyBottom extends Component {
  handlerSummon() {
    ReactDOM.render(
      <Summon />,
      document.getElementById('root')
    );
  }
  render() {
    return (
      <div className="page-header">
        <h1>BodyBottom<small>Gomorronsol</small></h1>
        <button onClick={this.handlerSummon}>summon</button>
      </div>
    );
  }
}

export default BodyBottom;
