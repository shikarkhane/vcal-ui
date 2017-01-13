import React, { Component } from 'react';
import reqwest from 'reqwest';

class Children extends Component {
  handleSave(){
    reqwest({
        url: 'http://localhost:8080/children/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ term_id: 1, child_count: 1})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }
  render() {
    return (
      <div className="page-header">
        <h1>Children <small>gs</small></h1>
          <h3>Kids per term at gs</h3>
          <div className="btn-group btn-group-lg" role="group">
            <button type="button" className="btn btn-default" onClick={this.handleSave}>1</button>
            <button type="button" className="btn btn-default" onClick={this.handleSave}>2</button>
            <button type="button" className="btn btn-default" onClick={this.handleSave}>3</button>
          </div>
      </div>
    );
  }
}

export default Children;
