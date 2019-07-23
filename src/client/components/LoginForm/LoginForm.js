import React from 'react';
import { Icon, Input, Button, Checkbox, Card, Alert } from 'antd';
import Form from 'antd/lib/form';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import * as actionTypes from '../../store/constants/actionTypes';

import 'antd/dist/antd.css';

import _s from './LoginForm.less';

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

class LoginForm extends React.Component {
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
    const { getFieldDecorator } = this.props.form;

    return (
      <Mutation mutation={LOG_IN}>
        {(logIn, { data, loading, error }) => {
          return (
            <Card>
              <p style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                <Icon style={{ paddingRight: '5px' }} type="login" /> Log In
              </p>
              {error && (
                <Alert
                  message="Please provide a valid username and password."
                  type="error"
                  showIcon
                  style={{ marginBottom: '1.05rem', maxWidth: '300px' }}
                />
              )}
              <Form onSubmit={e => this.handleSubmit(e, logIn)} className={_s.loginForm}>
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Please input your email!' }]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }]
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item style={{ marginBottom: 'unset' }}>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a className={_s.loginFormForgot} href="/">
                    Forgot password
                  </a>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={_s.loginFormButton}
                  >
                    Log in
                  </Button>
                  Or <Link to="/register">register now!</Link>
                </Form.Item>
              </Form>
            </Card>
          );
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

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

const WrapperLoginForm = Form.create()(connectedLoginForm);

export default withRouter(WrapperLoginForm);
