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

   if ( Number(localStorage.getItem("role")) !== 1){
     if (! groupName){
        hashHistory.push('/mygroup');
        return;
     }
     if (! termName) {
        hashHistory.push('/myterm');
        return;
     }
   }

    this.setState({groupName: groupName });
    this.setState({termName: termName});
  }

  render() {
    const marginButtons = {
      marginRight: 5,
    };
    const heightImg = {
      height: 65,
    }

    var profileObj = JSON.parse(localStorage.getItem("profileObj"));
    var profileImgUrl =  profileObj.imageUrl;
    return (
      <div className="page-header clearfix">
        <div className="pull-left">
          <Link to={'/'}>
            <button type="button" className="btn btn-default btn-lg">
              <span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home
            </button>
          </Link>
        </div>
        <div className="pull-right">
          <Link to={'/mygroup'}>
            <button type="button" style={marginButtons} className="btn btn-default btn-lg">{this.state.groupName}
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </Link>
          <Link to={'/myterm'}>
            <button type="button" style={marginButtons} className="btn btn-default btn-lg">{this.state.termName}
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </Link>
          <Link to={'/myprofile'}>
            <img src={profileImgUrl} style={marginButtons,heightImg} className="img-circle hidden-xs" role="Presentation"/>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
