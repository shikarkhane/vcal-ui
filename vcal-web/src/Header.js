import { conf } from './Config';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import reqwest from 'reqwest';
import Feedback from './Feedback';
import history from 'history/hash';

class Header extends Component {
  constructor(props) {
   super(props);
   this.state = {groupName: localStorage.getItem("groupName"), termName: localStorage.getItem("termName"),
   isRuleSet: true, feedbackMessage:"Rule is not set by admin. Signups and switch would not work."};

 }
 componentDidMount() {
     this.checksAndGets();

     var groupName = localStorage.getItem("groupName");
     var isTermOverridden = localStorage.getItem("isTermOverridden");
     var defaultTermId = localStorage.getItem("defaultTermId");
     var termName = localStorage.getItem("termName");
     var termId = localStorage.getItem("termId");
     var childrenCount = localStorage.getItem("childrenCount");
     var allTerms = localStorage.getItem("allTerms");

   if ( Number(localStorage.getItem("role")) == 1){
     if (! groupName){
        hashHistory.push('/mygroup');
        return;
     }
       this.setState({groupName: groupName });

       if (defaultTermId && allTerms && !isTermOverridden){
           var terms = JSON.parse(allTerms);
           var f = (terms.find(x => x.id === defaultTermId));
           if (f){
               termName = f.name;
           }
       }
       if (! termId) {
           hashHistory.push('/myterm');
           return;
       }

       this.setState({termName: termName});

       if (! childrenCount) {
           hashHistory.push('/children');
           return;
       }
   }


  }

    checksAndGets(){
        this.isRuleSet();
        this.refreshDefaultTerm();
        this.getChildrenCount();
        this.getMyUserInfo();
        this.getAllHolidays();
        this.getTerms();
    }
    refreshDefaultTerm(){
        var self = this;
        var groupId = localStorage.getItem("groupId");
        reqwest({
            url: conf.serverUrl + '/group/' + groupId + '/'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , success: function (resp) {
                // if empty response, remove child count cookie
                if ( Object.keys(resp).length === 0 && resp.constructor === Object ){
                    return 0;
                }
                localStorage.setItem("defaultTermId", resp.default_term_id);
            }
        });
    }
    getTerms(){
        var self = this;
        var groupId = localStorage.getItem("groupId");
        // todo: get list of terms for given group id
        reqwest({
            url: conf.serverUrl + '/term_details/' + groupId + '/'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , success: function (resp) {
                localStorage.setItem("allTerms", JSON.stringify(resp));
            }
        });
    }
    isRuleSet(){
        var groupId = localStorage.getItem("groupId");
        var termId = localStorage.getItem("termId");
        var self = this;

        // todo: get list of terms for given group id
        reqwest({
            url: conf.serverUrl + '/rule/' + groupId + '/term/' + termId + '/'
            , type: 'json'
            , contentType: 'application/json'
            , method: 'get'
            , success: function (resp) {
                if ( Object.keys(resp).length === 0 && resp.constructor === Object ){
                    return 0;
                }
                var x = JSON.parse(resp.definition)

                if( (Number(x.standin[0]) + Number(x.standin[1]) + Number(x.standin[2])
                + Number(x.workday[0]) + Number(x.workday[1]) + Number(x.workday[2]) ) > 0){
                    localStorage.setItem("isRuleSet", 1);
                    self.setState({isRuleSet: true});
                }
                else{
                    localStorage.setItem("isRuleSet", 0);
                    self.setState({isRuleSet: false});
                }
            }
        });
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
                // if empty response, remove child count cookie
                if ( Object.keys(resp).length === 0 && resp.constructor === Object ){
                    localStorage.removeItem("childrenCount");
                }
                if(resp.length >0){
                    localStorage.setItem("childrenCount", resp[0].child_count);
                }
            }
        });
    }

  getMyUserInfo(){
    var userId = localStorage.getItem("userId");
    reqwest({
      url: conf.serverUrl + '/user/' + userId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
            if (!localStorage.getItem("adminOverrideInProgress")){
                localStorage.setItem("role", resp.role);
            }
        localStorage.setItem("isActive", resp.is_active);
      }
    });
  }
  getAllHolidays(){
    var groupId = localStorage.getItem("groupId");
    reqwest({
        url: conf.serverUrl + '/holiday/' + groupId + '/'
      , type: 'json'
      , method: 'get'
      , contentType: 'application/json'
      , success: function (resp) {
        //console.log(resp);
        var holidays = [];
        for (var i = 0; i < resp.length; i++) {
          holidays.push(resp[i]['holiday_date']);
        }
        localStorage.setItem("holidays", JSON.stringify(holidays));
      }
    });
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
          <Feedback displayAlert={!this.state.isRuleSet} message={this.state.feedbackMessage} />

        <div className="float-left">
          <Link to={'/'}>
            <button type="button" className="btn btn-primary">
              <span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home
            </button>
          </Link>
        </div>
        <div className="float-right">
          <Link to={'/mygroup'}>
            <button type="button" style={marginButtons} className="btn btn-primary">{this.state.groupName}
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
          </Link>
          <Link to={'/myterm'}>
            <button type="button" style={marginButtons} className="btn btn-primary">{this.state.termName}
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
