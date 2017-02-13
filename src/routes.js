import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SessionListPage from './sessions/components/SessionListPage';
import SessionDetailPage from './sessions/components/SessionDetailPage';

import App from './app/components/App';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SessionListPage}/>
    <Route path="sessions/:id" component={SessionDetailPage} />
  </Route>
);
