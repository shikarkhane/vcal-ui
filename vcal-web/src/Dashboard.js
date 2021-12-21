import React, { Component } from 'react';

import Header from './Header';
import MyBody from './MyBody';
import Footer from './Footer';
import WorkSignUp from './WorkSignUp';
import Children from './Children';

class Dashboard extends Component {
  render() {
    if ( Number(localStorage.getItem("role")) === 1){
        var childrenCount = localStorage.getItem("childrenCount");
        if (! childrenCount){
            return(<Children />);
        }
        else{
            return (<WorkSignUp />);
        }

    }
    else{
      return(<div >
          <Header />
          <MyBody />
          <Footer />
          </div>);
    }
  }
}

export default Dashboard;
