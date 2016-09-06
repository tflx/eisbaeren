import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainLayout from './views/MainLayout';
import IndexView from './views/IndexView';
import Players from './views/Players';
import ProfileView from './views/ProfileView';
import Score from './views/Score';
import InfoView from './views/InfoView';
import ActivityDetailsView from './views/ActivityDetailsView';
import {getUser} from 'utils/user';

function requireAuth(nextState, replaceState) {
  if (!getUser()) {
    replaceState({ nextPathname: nextState.location.pathname }, '/');
  }
}

export default (
  <Router history={browserHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={IndexView} />
      <Route path="spillere" component={Players} onEnter={requireAuth} />
      <Route path="profil" component={ProfileView} onEnter={requireAuth} />
      <Route path="stilling" component={Score} onEnter={requireAuth} />
      <Route path="info" component={InfoView} onEnter={requireAuth} />
      <Route path="aktiviteter/id/:eventId" component={ActivityDetailsView} onEnter={requireAuth} />
    </Route>
  </Router>
);
