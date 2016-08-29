import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from './views/MainLayout';
import IndexView from './views/IndexView';
import Players from './views/Players';
import Profile from './views/Profile';
import Score from './views/Score';
import Info from './views/Info';
import ActivityDetailsView from './views/ActivityDetailsView';


export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={IndexView} />
      <Route path="spillere" component={Players} />
      <Route path="profil" component={Profile} />
      <Route path="stilling" component={Score} />
      <Route path="info" component={Info} />
      <Route path="activities/:eventId" component={ActivityDetailsView} />
    </Route>
  </Router>
);
