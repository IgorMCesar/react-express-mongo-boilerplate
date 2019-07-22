import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import GuestRoute from './components/GuestRoute/GuestRoute';
import CheckIfLoggedIn from './components/CheckIfLoggedIn/CheckIfLoggedIn';

import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import DashboardPage from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <CheckIfLoggedIn>
      <Switch>
        <PrivateRoute exact path="/" component={DashboardPage} />
        <GuestRoute exact path="/login" component={LoginPage} />
        <GuestRoute exact path="/register" component={RegisterPage} />
      </Switch>
    </CheckIfLoggedIn>
  );
};

export default App;
