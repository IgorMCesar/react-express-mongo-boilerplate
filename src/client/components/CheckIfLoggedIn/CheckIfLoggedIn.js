import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mutations } from '../../graphql/graphql';
import actions from '../../store/actions/actions';

const CheckIfLoggedIn = props => {
  if (props.firstAuthValidationDone) return props.children;

  const [CheckIfLoggedIn, { data, loading, error }] = useMutation(mutations.VERIFY_LOGGED_IN);

  useEffect(() => {
    CheckIfLoggedIn();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (data) {
    props.setFirstAuthState(true, data.LogIn);
    console.log('Did First Auth Validation');
  }

  if (error) {
    props.setFirstAuthState(false, null);
    console.log('Did First Auth Validation');
  }

  return props.children;
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
