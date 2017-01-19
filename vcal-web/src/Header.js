import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <div >
          <ul className="nav nav-pills">
            <li role="presentation" className="active"><Link to={'/'}>Home</Link></li>
          </ul>
          <h1>Vikarie calendar<small>gs</small></h1>
      </div>
    );
  }
}

export default Header;
