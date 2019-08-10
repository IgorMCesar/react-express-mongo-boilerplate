import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import { Form, Icon, Input, Button, Checkbox, Card, Alert, message } from 'antd';

import validators from '../../validators/validators';
import { mutations } from '../../graphql/graphql';
import actions from '../../store/actions/actions';

import _s from './LoginForm.less';

const handleSubmit = async (values, { props, setErrors, setSubmitting, setStatus }) => {
  const { email, password } = values;
  props.LogIn({ variables: { email, password } }).then(
    res => {
      props.setAuthUser(res.data.LogIn);
      message.info('Logged in successfully');
    },
    e => {
      setSubmitting(false);
      e.graphQLErrors.map(x => {
        console.log(x.message);
        // TODO NOT VERIFIED MESSAGE
        // if (x.message.includes('email')) errors.email = 'Email has already been taken.';
        // if (x.message.includes('username')) errors.username = 'Username has already been taken.';
      });
      setErrors({ auth: 'Incorrect email or password.' });
    }
  );
};

const LoginForm = props => {
  const { values, handleChange, handleBlur, handleSubmit, errors, isSubmitting } = props;
  return (
    <Card>
      <p style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
        <Icon style={{ paddingRight: '5px' }} type="login" /> Log In
      </p>
      {Object.keys(errors).length > 0 && (
        <Alert
          message={errors.email || errors.password || errors.auth}
          type="error"
          showIcon
          style={{ marginBottom: '1.05rem', maxWidth: '300px' }}
        />
      )}
      <form className={_s.loginForm} onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            name="email"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={_s.loginFormInput}
          />
        </Form.Item>
        <Form.Item>
          <Input
            name="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={_s.loginFormInput}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 'unset' }}>
          <Checkbox>Remember me</Checkbox>
          <a className={_s.loginFormForgot} href="/">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className={_s.loginFormButton}
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </form>
    </Card>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  setAuthUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setAuthUser: actions.setAuthUser
    },
    dispatch
  );
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(mutations.LOG_IN, { name: 'LogIn' }),
  withFormik({
    validationSchema: validators.user.loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit,
    mapPropsToValues: () => ({ email: '', password: '' })
  })
)(LoginForm);
