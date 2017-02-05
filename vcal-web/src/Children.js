import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';

class Children extends Component {
  constructor(props) {
     super(props);
     this.state = {childCount: 1};
      this.changeChildrenCount = this.changeChildrenCount.bind(this);
      this.handleSave = this.handleSave.bind(this);
   }
   componentDidMount() {
        this.getChildrenCount();
    }

    changeChildrenCount(e){
        this.setState({childCount: e.target.value });
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

  handleSave(){
    var termId = localStorage.getItem("termId");
    reqwest({
        url: conf.serverUrl + '/children/' + termId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({child_count: this.state.childCount})
      , success: function (resp) {
          //console.log(resp);
        }
    });
  }
  render() {
    var termName = localStorage.getItem("termName");
    return (
      <div>
        <Header />
        <h1>Children <small>VT2016</small></h1>
        <label htmlFor="basic-url">How many of your kids will attend dagis in {termName} term?</label>
        <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Kid count</span>
              <input type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3"
                onChange={this.changeChildrenCount} value={this.state.childCount}/>

          <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.handleSave.bind(this)} type="button">Save</button>
          </span>
          </div>
      </div>
    );
  }
}

export default Children;
