import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';

import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';

import validators from '../../validators/validators';
import { mutations } from '../../graphql/graphql';

import EmailSent from '../EmailSent/EmailSent';
import _s from './RegisterForm.less';

const handleSubmit = async (values, { props, setErrors, setSubmitting, setStatus }) => {
  const { email, password, name, username } = values;
  props.signUp({ variables: { email, password, name, username } }).then(
    res => {
      setStatus({ email });
    },
    e => {
      const errors = {};

      e.graphQLErrors.map(x => {
        if (x.message.includes('email')) {
          errors.email = 'Email has already been taken.';
          message.error(errors.email);
        }
        if (x.message.includes('username')) {
          errors.username = 'Username has already been taken.';
          message.error(errors.username);
        }
      });
      setSubmitting(false);
      setErrors(errors);
    }
  );
};

const RegisterForm = props => {
  const {
    values,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isSubmitting
  } = props;

  if (status && status.email) {
    return <EmailSent email={status.email} />;
  } else {
    return (
      <Card className={_s.RegisterFormCard}>
        <p style={{ fontWeight: 'bold', fontSize: '1.05rem', textAlign: 'center' }}>
          <Icon style={{ paddingRight: '5px' }} type="user-add" /> Register
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Item
            hasFeedback
            help={touched.username && errors.username ? errors.username : ''}
            validateStatus={
              touched.username && errors.username
                ? 'error'
                : touched.username
                ? 'success'
                : undefined
            }
          >
            <Input
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            help={touched.name && errors.name ? errors.name : ''}
            validateStatus={
              touched.name && errors.name ? 'error' : touched.name ? 'success' : undefined
            }
          >
            <Input
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            help={touched.email && errors.email ? errors.email : ''}
            validateStatus={
              touched.email && errors.email ? 'error' : touched.email ? 'success' : undefined
            }
          >
            <Input
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            help={touched.password && errors.password ? errors.password : ''}
            validateStatus={
              touched.password && errors.password
                ? 'error'
                : touched.password
                ? 'success'
                : undefined
            }
          >
            <Input.Password
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            help={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
            validateStatus={
              touched.confirmPassword && errors.confirmPassword
                ? 'error'
                : touched.confirmPassword
                ? 'success'
                : undefined
            }
          >
            <Input.Password
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            help={touched.terms && errors.terms ? errors.terms : ''}
            validateStatus={touched.terms && errors.terms ? 'error' : undefined}
          >
            <Checkbox name="terms" value={values.terms} onChange={handleChange}>
              I agree to FAKE Terms of Service
            </Checkbox>
          </Form.Item>
          <Form.Item style={{ marginBottom: 'unset' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className={_s.RegisterFormButton}
            >
              Resgister
            </Button>
            <span>
              Already have an account? <Link to="/">Log In</Link>
            </span>
          </Form.Item>
        </Form>
      </Card>
    );
  }
};

const WrapperRegisterForm = compose(
  graphql(mutations.SIGN_UP, { name: 'signUp' }),
  withFormik({
    validationSchema: validators.user.registerSchema,
    // validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }),
    handleSubmit
  })
)(RegisterForm);

export default WrapperRegisterForm;
