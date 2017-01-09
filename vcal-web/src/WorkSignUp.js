import React, { Component } from 'react';
import WorkSignUpComponent from './WorkSignUpComponent';

class WorkSignUp extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>WorkSignUp<small>Gomorronsol</small></h1>
        <WorkSignUpComponent />
        <WorkSignUpComponent />
      </div>
    );
  }
}

export default WorkSignUp;
