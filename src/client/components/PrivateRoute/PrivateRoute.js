import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loggedIn, user, ...rest }) => {
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.authState.user,
    loggedIn: state.authState.loggedIn
  };
};

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export default ConnectedPrivateRoute;
