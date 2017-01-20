import React, { Component } from 'react';
import reqwest from 'reqwest';

class CreateSummon extends Component {
  constructor(props) {
   super(props);
   this.state = {};

   this.changeTerm = this.changeTerm.bind(this);
   this.changeStartDate = this.changeStartDate.bind(this);
   this.changeEndDate = this.changeEndDate.bind(this);
   this.changeKid1 = this.changeKid1.bind(this);
   this.changeKid2 = this.changeKid2.bind(this);
   this.changeKid3 = this.changeKid3.bind(this);
   this.handleSave = this.handleSave.bind(this);

 }

  changeTerm(e){
    this.setState({termName: e.target.value });
  }
  changeStartDate(e){
    this.setState({startDate: e.target.value });
  }
  changeEndDate(e){
    this.setState({endDate: e.target.value });
  }
  changeKid1(e){
    this.setState({kid1: e.target.value });
  }
  changeKid2(e){
    this.setState({kid2: e.target.value });
  }
  changeKid3(e){
    this.setState({kid3: e.target.value });
  }

  handleSave(e){
    e.preventDefault();
    var groupId = localStorage.getItem("groupId");
    //var creatorId = 1;
    reqwest({
        url: 'http://localhost:8080/term/'
      , type: 'json'
      , method: 'post'
      , contentType: 'application/json'
      , data: JSON.stringify({ group_id: groupId,
          term_name: this.state.termName, start_date: this.state.startDate,
          end_date: this.state.endDate,
           family_spread: {kid_1: this.state.kid1, kid_2: this.state.kid2,
             kid_3: this.state.kid3}})
      , success: function (resp) {
          console.log(resp);
        }
    });

  }
  render() {
    return (
          <form onSubmit={this.handleSave}>
              <h4>Create term</h4>
              <label >Term name
                    <input type="text" onChange={this.changeTerm}
                  value={this.state.termName}/>
              </label>
              <label >Start Date
                    <input type="date" onChange={this.changeStartDate}
            value={this.state.startDate}/>
              </label>
              <label >End Date
                    <input type="date" onChange={this.changeEndDate}
            value={this.state.endDate}/>
              </label>
              <label >Family count with 1 kid
                    <input type="number"  placeholder="15"
            onChange={this.changeKid1} value={this.state.kid1} />
              </label>
              <label >Family count with 2 kid
                    <input type="number"  placeholder="5"
            onChange={this.changeKid2} value={this.state.kid2} />
              </label>
              <label >Family count with 3 kid
                    <input id="term-family-3" type="number"  placeholder="1"
            onChange={this.changeKid3} value={this.state.kid3} />
              </label>
              <input type="submit" value="Submit" />
          </form>
    );
  }
}

export default CreateSummon;
