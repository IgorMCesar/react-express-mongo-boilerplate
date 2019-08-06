import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import GuestRoute from './components/GuestRoute/GuestRoute';
import CheckIfLoggedIn from './components/CheckIfLoggedIn/CheckIfLoggedIn';

import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import DashboardPage from './pages/Dashboard/Dashboard';
import PageNotFound from './pages/NotFound/NotFound';
import Toastr from './components/Toastr/Toastr';
import actions from './store/actions';

const App = props => {
  return (
    <ConnectedRouter history={props.history}>
      <CheckIfLoggedIn>
        <Toastr />
        <Switch>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <GuestRoute exact path="/login" component={LoginPage} />
          <GuestRoute exact path="/register" component={RegisterPage} />
          <Route component={PageNotFound} />
        </Switch>
      </CheckIfLoggedIn>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object,
  loggedIn: PropTypes.bool,
  showToastr: PropTypes.func.isRequired
};

App.defaultProps = {
  loggedIn: false
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showToastr: actions.showToastr
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
