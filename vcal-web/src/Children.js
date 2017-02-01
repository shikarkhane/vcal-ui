import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';

class Children extends Component {
  constructor(props) {
     super(props);
     this.state = {childCount: 1};
   }
   componentDidMount() {
        this.getChildrenCount();
    }
    getChildrenCount(){
      var self = this;
      var termId = localStorage.getItem("termId");
       reqwest({
           url: conf.serverUrl + '/children/' + termId + '/'
           , type: 'json'
           , contentType: 'application/json'
         , method: 'get'
         , success: function (resp) {
                if(resp.length >0){
                  self.setState({childCount: resp[0].child_count });
                }
           }
       });
    }

  handleSave(childCount){
    var termId = localStorage.getItem("termId");
    reqwest({
        url: conf.serverUrl + '/children/' + termId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({child_count: childCount})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    var termName = localStorage.getItem("termName");
    return (
      <div>
        <Header />
        <h1>Children <small>gs</small><small>VT2016</small></h1>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Kids in {termName} term
              <span className="label label-default">{this.state.childCount}</span> </h3>
              </div>
            <div className="panel-body">
              <div className="btn-group btn-group-lg" role="group">
                <button id='child_per_term_1' type="button" className="btn btn-default" onClick={this.handleSave.bind(null, 1)}>1</button>
                <button id='child_per_term_2' type="button" className="btn btn-default" onClick={this.handleSave.bind(null, 2)}>2</button>
                <button id='child_per_term_3' type="button" className="btn btn-default" onClick={this.handleSave.bind(null, 3)}>3</button>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Children;
