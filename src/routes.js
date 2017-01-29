import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SessionListPage from './containers/SessionListPage';
import SessionDetailPage from './containers/SessionDetailPage';

import App from './components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SessionListPage}/>
    <Route path="sessions/:id" component={SessionDetailPage} />
  </Route>
);
