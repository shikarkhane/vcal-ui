import React, { Component } from 'react';
import reqwest from 'reqwest';

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
      var termId = 1;
       reqwest({
           url: 'http://localhost:8080/children/' + termId + '/'
           , type: 'json'
           , contentType: 'application/json'
         , method: 'get'
         , success: function (resp) {
                self.setState({childCount: resp[0].child_count });
           }
       });
    }

  handleSave(e, childCount){
    var self = e;
    var termId = 1;
    reqwest({
        url: 'http://localhost:8080/children/' + termId + '/'
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
    return (
      <div className="page-header">
        <h1>Children <small>gs</small><small>VT2016</small></h1>
          <h3>Kids per term at gs -> {this.state.childCount}</h3>
          <div className="btn-group btn-group-lg" role="group">
            <button id='child_per_term_1' type="button" className="btn btn-default" onClick={this.handleSave.bind(this, 1)}>1</button>
            <button id='child_per_term_2' type="button" className="btn btn-default" onClick={this.handleSave.bind(this, 2)}>2</button>
            <button id='child_per_term_3' type="button" className="btn btn-default" onClick={this.handleSave.bind(this, 3)}>3</button>
          </div>
      </div>
    );
  }
}

export default Children;
