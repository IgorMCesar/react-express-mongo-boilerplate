import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../store/actions/actions';

import 'antd/dist/antd.css';

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
          props.setFirstAuthState(true, data.LogIn);
          console.log('Did First Auth Validation');
        }
        if (error) {
          props.setFirstAuthState(false, null);
          console.log('Did First Auth Validation');
        }
        return (
          <CallLogin CheckIfLoggedIn={CheckIfLoggedIn}>
            {loading && <Spin />}
            {(data || error) && props.children}
          </CallLogin>
        );
      }}
    </Mutation>
  );
};

const mapStateToProps = state => {
  return {
    firstAuthValidationDone: state.auth.firstAuthValidationDone
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setFirstAuthState: actions.setFirstAuthState
    },
    dispatch
  );
};

CheckIfLoggedIn.propTypes = {
  firstAuthValidationDone: PropTypes.bool.isRequired,
  setFirstAuthState: PropTypes.func.isRequired
};

const connectedCheckIfLoggedIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckIfLoggedIn);

export default connectedCheckIfLoggedIn;
