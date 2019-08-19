import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loggedIn, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
};

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  Component: PropTypes.elementType,
  user: PropTypes.object
};

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;
