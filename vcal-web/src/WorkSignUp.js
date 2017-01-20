import { conf } from './config';
import React, { Component } from 'react';
import WorkSignUpComponent from './WorkSignUpComponent';
import WorkSignUpSummary from './WorkSignUpSummary';
import Header from './Header';

class WorkSignUp extends Component {
  render() {
    return (
      <div >
        <Header />
        <h1>WorkSignUp<small>gs</small></h1>
        <WorkSignUpSummary />
        <WorkSignUpComponent />
      </div>
    );
  }
}

export default WorkSignUp;
