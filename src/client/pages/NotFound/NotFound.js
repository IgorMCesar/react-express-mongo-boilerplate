import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

import LoggedLayout from '../../components/Layouts/LoggedLayout';
import GuestLayout from '../../components/Layouts/GuestLayout';

// import _s from './Dashboard.less';

const NotFound = props => (
  <div>
    {props.loggedIn ? (
      <LoggedLayout>
        <Card>404 - Page Not Found</Card>
      </LoggedLayout>
    ) : (
      <GuestLayout>
        <Card>404 - Page Not Found</Card>
      </GuestLayout>
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    loggedIn: state.authState.loggedIn
  };
};

const connectedNotFound = connect(mapStateToProps)(NotFound);

export default connectedNotFound;
