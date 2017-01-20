import { conf } from './config';
import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';

class Header extends Component {
  constructor(props) {
   super(props);
   this.state = {groupName:"", termName: ""};
 }
 componentDidMount() {
   var groupName = localStorage.getItem("groupName");
   var termName = localStorage.getItem("termName");

   if (! groupName){
      hashHistory.push('/mygroup');
      return;
   }
   if (! termName) {
      hashHistory.push('/myterm');
      return;
   }

    this.setState({groupName: groupName });
    this.setState({termName: termName});
  }

  render() {
    return (
      <div >
        <div>
          <Link to={'/'}>
            <button type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home
            </button>
          </Link>
        </div>
        <div className="pull-right">
          <Link to={'/mygroup'}>
            <button type="button" className="btn btn-default btn-lg">{this.state.groupName}
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </Link>
          <Link to={'/myterm'}>
            <button type="button" className="btn btn-default btn-lg">{this.state.termName}
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </Link>
          <Link to={'/myprofile'}>
            <button type="button" className="btn btn-default btn-lg">Profile
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
