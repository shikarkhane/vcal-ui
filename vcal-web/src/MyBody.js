import { conf } from './Config';
import React, { Component } from 'react';
import BodyTop from './BodyTop';
import BodyMiddle from './BodyMiddle';
import BodyBottom from './BodyBottom';

class MyBody extends Component {
  render() {
    return (
    <div>
        <BodyTop />
        <BodyMiddle />
        <BodyBottom />
    </div>
    );
  }
}

export default MyBody;
