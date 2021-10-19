import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Router, Route } from "react-router-dom";

import {createHashHistory} from 'history';
const hashHistory = createHashHistory();

import App from './App';
import MyGroup from './MyGroup';
import MyTerm from './MyTerm';
import Summon from './Summon';
import Workday from './Workday';
import Term from './Term';
import NoShowUps from './ShowUps';
import Invite from './Invite';
import Member from './Member';
import Rule from './Rule';
import Children from './Children';
import WorkSignUp from './WorkSignUp';
import SwitchDay from './Switchday';
import MyProfile from './MyProfile';
import Dashboard from './Dashboard';
import Holidays from './Holidays';
import Overview from './Overview';
import Statistic from './Statistic';
import AssignUser from './Assign';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/mygroup" component={MyGroup}></Route>
    <Route path="/myterm" component={MyTerm}></Route>
    <Route path="/summon" component={Summon}></Route>
    <Route path="/workday" component={Workday}></Route>
    <Route path="/term" component={Term}></Route>
    <Route path="/NoShowUps" component={NoShowUps}></Route>
    <Route path="/invite" component={Invite}></Route>
    <Route path="/member" component={Member}></Route>
    <Route path="/rule" component={Rule}></Route>
    <Route path="/children" component={Children}></Route>
    <Route path="/worksignup" component={WorkSignUp}></Route>
    <Route path="/switchday" component={SwitchDay}></Route>
    <Route path="/myprofile" component={MyProfile}></Route>
    <Route path="/dashboard" component={Dashboard}></Route>
    <Route path="/holidays" component={Holidays}></Route>
    <Route path="/overview" component={Overview}></Route>
    <Route path="/statistic" component={Statistic}></Route>
    <Route path="/assign" component={AssignUser}></Route>
  </Router>
  , document.getElementById('root')
);
