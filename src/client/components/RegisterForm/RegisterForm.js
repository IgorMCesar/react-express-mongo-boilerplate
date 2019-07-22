import React from 'react';
import { Card } from 'antd';
import Form from 'antd/lib/form';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import * as actionTypes from '../../store/constants/actionTypes';

import 'antd/dist/antd.css';

// import _s from './RegisterForm.less';

const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    LogIn(email: $email, password: $password) {
      id
      name
      email
      username
      role
    }
  }
`;

class RegisterForm extends React.Component {
  handleSubmit = (e, logIn) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        logIn({
          variables: { email: values.email, password: values.password }
        })
          .then(res => {
            this.props.onLogIn(res.data.LogIn);
            this.props.history.push('/');
          })
          .catch(err => console.log(err));
      }
    });
  };

  render() {
    // const { getFieldDecorator } = this.props.form;

    return (
      <Mutation mutation={LOG_IN}>
        {(logIn, { data, loading, error }) => {
          return <Card>RegisterForm here</Card>;
        }}
      </Mutation>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authState.user,
    loggedIn: state.authState.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: user => dispatch({ type: actionTypes.SET_AUTH_USER, user })
  };
};

const connectedRegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);

const WrapperRegisterForm = Form.create()(connectedRegisterForm);

export default withRouter(WrapperRegisterForm);
