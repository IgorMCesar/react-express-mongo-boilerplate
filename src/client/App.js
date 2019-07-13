import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/Home/Home';
import DashboardPage from './pages/Dashboard';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  );
};

export default App;
