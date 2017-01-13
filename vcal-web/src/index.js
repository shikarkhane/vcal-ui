import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from './App';
import MyGroup from './MyGroup';
import MyTerm from './MyTerm';
import Term from './Term';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/mygroup" component={MyGroup}></Route>
    <Route path="/myterm" component={MyTerm}></Route>
    <Route path="/term" component={Term}></Route>
  </Router>
  , document.getElementById('root')
);
