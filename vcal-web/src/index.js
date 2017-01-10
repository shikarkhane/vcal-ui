import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from './App';
import Group from './Group';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
    <Route path="/group" component={Group}></Route>
  </Router>
  , document.getElementById('root')
);
