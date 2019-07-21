import React from 'react';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/constants/actionTypes';

import 'antd/dist/antd.css';

// import _s from './LoginForm.less';

const VERIFY_LOGGED_IN = gql`
  mutation CheckIfLoggedIn {
    CheckIfLoggedIn {
      id
      name
      email
      username
      role
    }
  }
`;

class CallLogin extends React.Component {
  componentDidMount() {
    this.props.CheckIfLoggedIn();
  }

  render() {
    return this.props.children;
  }
}

const CheckIfLoggedIn = props => {
  if (props.firstAuthValidationDone) return props.children;
  return (
    <Mutation mutation={VERIFY_LOGGED_IN}>
      {(CheckIfLoggedIn, { data, loading, error }) => {
        if (data) {
          props.onLogIn(true, data.LogIn);
          console.log('Did First Auth Validation');
        }
        if (error) {
          props.onLogIn(false, null);
          console.log('Did First Auth Validation');
        }
        return (
          <CallLogin CheckIfLoggedIn={CheckIfLoggedIn}>
            {loading ? <Spin /> : null}
            {data || error ? <div>{props.children}</div> : null}
          </CallLogin>
        );
      }}
    </Mutation>
  );
};

const mapStateToProps = state => {
  return {
    firstAuthValidationDone: state.authState.firstAuthValidationDone
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (loggedIn, user) =>
      dispatch({ type: actionTypes.SET_FIRST_AUTH_STATE, loggedIn, user })
  };
};

const connectedCheckIfLoggedIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckIfLoggedIn);

export default connectedCheckIfLoggedIn;
