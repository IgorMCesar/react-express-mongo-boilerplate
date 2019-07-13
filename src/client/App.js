import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}

export default App;
