import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckIfLoggedIn from './components/CheckIfLoggedIn/CheckIfLoggedIn';

import HomePage from './pages/Home/Home';
import DashboardPage from './pages/Dashboard';

const App = () => {
  return (
    <CheckIfLoggedIn>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </CheckIfLoggedIn>
  );
};

export default App;
