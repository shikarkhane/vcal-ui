import React, { Component } from 'react';

import Header from './Header';
import MyBody from './MyBody';
import Footer from './Footer';

class Dashboard extends Component {
  render() {

    return(<div >
      <Header />
      <MyBody />
      <Footer />
    </div>);
  }
}

export default Dashboard;
