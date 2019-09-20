import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form, Icon, Input, Button, Checkbox, Card, Alert, message } from 'antd';

import { FormInputField } from '../FormInputField/FormInputField';

import validators from '../../validators/validators';
import { mutations } from '../../graphql/graphql';
import actions from '../../store/actions/actions';

import _s from './LoginForm.less';

const LoginForm = props => {
  const [LogIn] = useMutation(mutations.LOG_IN);

  const handleSubmitForm = async (values, actions) => {
    const { email, password } = values;
    const { setErrors, setSubmitting } = actions;

    LogIn({ variables: { email, password } }).then(
      res => {
        props.setAuthUser(res.data.LogIn);
        message.success('Logged in successfully');
      },
      err => {
        setSubmitting(false);
        err.graphQLErrors.map(x => {
          console.log(x.message);
          // TODO NOT VERIFIED MESSAGE
          // if (x.message.includes('email')) errors.email = 'Email has already been taken.';
          // if (x.message.includes('username')) errors.username = 'Username has already been taken.';
        });
        setErrors({ auth: 'Incorrect email or password.' });
      }
    );
  };

  return (
    <Card className={_s.LoginFormCard}>
      <p style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
        <Icon style={{ paddingRight: '5px' }} type="login" /> Log In
      </p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validators.user.loginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => handleSubmitForm(values, actions)}
        render={formikProps => {
          const { errors, isSubmitting, handleSubmit } = formikProps;

          return (
            <>
              {Object.keys(errors).length > 0 && (
                <Alert
                  message={errors.email || errors.password || errors.auth}
                  type="error"
                  showIcon
                  style={{ marginBottom: '1.05rem', maxWidth: '300px' }}
                />
              )}
              <Form onSubmit={handleSubmit}>
                <Field
                  InputType={Input}
                  component={FormInputField}
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="email"
                  placeholder="Email"
                  hideErrorMessage={true}
                />
                <Field
                  InputType={Input}
                  component={FormInputField}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="password"
                  placeholder="Password"
                  type="password"
                  hideErrorMessage={true}
                />
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
              </Form>
            </>
          );
        }}
      />
    </Card>
  );
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

LoginForm.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setAuthUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
