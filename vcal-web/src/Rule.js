import { conf } from './Config';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import Header from './Header';

class Rule extends Component {

  constructor(props) {
     super(props);
     // todo: get list of active terms in the group
     this.state = {standinKid1: 0, standinKid2:0, standinKid3:0,
     workdayKid1:0, workdayKid2:0, workdayKid3:0};

     this.changeStandinKid1 = this.changeStandinKid1.bind(this);
     this.changeStandinKid2 = this.changeStandinKid2.bind(this);
     this.changeStandinKid3 = this.changeStandinKid3.bind(this);
     this.changeWorkdayKid1 = this.changeWorkdayKid1.bind(this);
     this.changeWorkdayKid2 = this.changeWorkdayKid2.bind(this);
     this.changeWorkdayKid3 = this.changeWorkdayKid3.bind(this);

     this.handleSave = this.handleSave.bind(this);
   }
  handleSave(){
    var groupId = localStorage.getItem("groupId");
    var termId = localStorage.getItem("termId");
    var standinKid1 = this.state.standinKid1;
    var standinKid2 = this.state.standinKid2;
    var standinKid3 = this.state.standinKid3;
    var workdayKid1 = this.state.workdayKid1;
    var workdayKid2 = this.state.workdayKid2;
    var workdayKid3 = this.state.workdayKid3;

    reqwest({
        url: conf.serverUrl + '/rule/' + groupId + '/term/' + termId + '/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({
           definition: {standin: [standinKid1, standinKid2, standinKid3],
             workday: [workdayKid1, workdayKid2, workdayKid3]}})
      , success: function (resp) {
          console.log(resp);
        }
    });
  }

  changeStandinKid1(e){
    this.setState({standinKid1: e.target.value });
  }
  changeStandinKid2(e){
    this.setState({standinKid2: e.target.value });
  }
  changeStandinKid3(e){
    this.setState({standinKid3: e.target.value });
  }
  changeWorkdayKid1(e){
    this.setState({workdayKid1: e.target.value });
  }
  changeWorkdayKid2(e){
    this.setState({workdayKid2: e.target.value });
  }
  changeWorkdayKid3(e){
    this.setState({workdayKid3: e.target.value });
  }

 componentDidMount() {
      this.getRule();
  }
  getRule(){
    var self = this;
    var groupId = localStorage.getItem("groupId");
    var termId = localStorage.getItem("termId");

     // todo: get list of terms for given group id
     reqwest({
         url: conf.serverUrl + '/rule/' + groupId + '/term/' + termId + '/'
         , type: 'json'
         , contentType: 'application/json'
       , method: 'get'
       , success: function (resp) {
              var x = JSON.parse(resp.definition)
              self.setState({
                standinKid1: x.standin[0],
                standinKid2: x.standin[1],
                standinKid3: x.standin[2],
                workdayKid1: x.workday[0],
                workdayKid2: x.workday[1],
                workdayKid3: x.workday[2],
              });
         }
     });
  }
  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSave}>
          <h1>Rule<small>gs</small></h1>
            <div>
                <h4>Stand-in day rule</h4>
                <label >Family with 1 kid</label>
                <input type="number"
                  onChange={this.changeStandinKid1} value={this.state.standinKid1}/>
                <label >Family with 2 kids</label>
                <input type="number"
                  onChange={this.changeStandinKid2} value={this.state.standinKid2}/>
                <label >Family with 3 kids</label>
                <input type="number"
                  onChange={this.changeStandinKid3} value={this.state.standinKid3}/>
            </div>
            <div>
                <h4>Work day rule</h4>
                <label >Family with 1 kid</label>
                <input type="number"
                  onChange={this.changeWorkdayKid1} value={this.state.workdayKid1}/>
                <label >Family with 2 kids</label>
                <input type="number"
                  onChange={this.changeWorkdayKid2} value={this.state.workdayKid2}/>
                <label >Family with 3 kids</label>
                <input type="number"
                  onChange={this.changeWorkdayKid3} value={this.state.workdayKid3}/>
            </div>
            <input type="submit" value="Submit" />
        </form>
    </div>
    );
  }

}

export default Rule;
