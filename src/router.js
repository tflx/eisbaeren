import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from './views/MainLayout';
import Index from './views/Index';
import Players from './views/Players';
import Profile from './views/Profile';
import Score from './views/Score';
import Info from './views/Info';


export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Index} />
      <Route path="spillere" component={Players} />
      <Route path="profil" component={Profile} />
      <Route path="stilling" component={Score} />
      <Route path="info" component={Info} />
    </Route>
  </Router>
);
