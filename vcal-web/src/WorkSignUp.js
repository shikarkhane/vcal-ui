import React, { Component } from 'react';
import WorkSignUpComponent from './WorkSignUpComponent';
import WorkSignUpSummary from './WorkSignUpSummary'

class WorkSignUp extends Component {
  render() {
    return (
      <div className="page-header">
        <h1>WorkSignUp<small>gs</small></h1>
        <WorkSignUpSummary />
        <WorkSignUpComponent />
      </div>
    );
  }
}

export default WorkSignUp;
