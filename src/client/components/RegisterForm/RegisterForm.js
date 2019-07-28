import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';

import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

import validators from '../../validators/validators';
import { mutations } from '../../graphql/graphql';

import _s from './RegisterForm.less';

const handleSubmit = async (values, { props, setErrors, setSubmitting, setStatus }) => {
  console.log('props', props);
  const { email, password } = values;
  props.LogIn({ variables: { email, password } }).then(
    res => {
      props.onLogIn(res.data.LogIn);
    },
    e => {
      setSubmitting(false);
      setErrors({ auth: 'Incorrect email or password.' });
    }
  );
};

const RegisterForm = props => {
  const { values, handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting } = props;
  return (
    <Card>
      <p style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
        <Icon style={{ paddingRight: '5px' }} type="login" /> Log In
      </p>
      <form className={_s.RegisterForm} onSubmit={handleSubmit}>
        <Form.Item
          help={touched.email && errors.email ? errors.email : ''}
          validateStatus={touched.email && errors.email ? 'error' : undefined}
        >
          <Input
            name="email"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          help={touched.password && errors.password ? errors.password : ''}
          validateStatus={touched.password && errors.password ? 'error' : undefined}
        >
          <Input
            name="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 'unset' }}>
          <Checkbox>Remember me</Checkbox>
          <a className={_s.RegisterFormForgot} href="/">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            className={_s.RegisterFormButton}
          >
            Log in
          </Button>
          Already have an account? <Link to="/">Log In</Link>
        </Form.Item>
      </form>
    </Card>
  );
};

const WrapperRegisterForm = compose(
  graphql(mutations.LOG_IN, { name: 'LogIn' }),
  withFormik({
    validationSchema: validators.user.loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit
  })
)(RegisterForm);

export default WrapperRegisterForm;
