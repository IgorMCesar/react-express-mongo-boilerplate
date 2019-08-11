import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import { withFormik, Field } from 'formik';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

import { FormInputField } from '../FormInputField/FormInputField';

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
        }
        if (x.message.includes('username')) {
          errors.username = 'Username has already been taken.';
        }
      });
      setSubmitting(false);
      setErrors(errors);
    }
  );
};

const RegisterForm = props => {
  const { status, handleSubmit, isSubmitting } = props;

  if (status && status.email) {
    return <EmailSent email={status.email} />;
  } else {
    return (
      <Card className={_s.RegisterFormCard}>
        <p style={{ fontWeight: 'bold', fontSize: '1.05rem', textAlign: 'center' }}>
          <Icon style={{ paddingRight: '5px' }} type="user-add" /> Register
        </p>
        <Form onSubmit={handleSubmit}>
          <Field
            InputType={Input}
            component={FormInputField}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="username"
            placeholder="Username"
            hasFeedback
          />
          <Field
            InputType={Input}
            component={FormInputField}
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="name"
            placeholder="Name"
            hasFeedback
          />
          <Field
            InputType={Input}
            component={FormInputField}
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder="Email"
            hasFeedback
          />
          <Field
            InputType={Input.Password}
            component={FormInputField}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            placeholder="Password"
            hasFeedback
          />
          <Field
            InputType={Input.Password}
            component={FormInputField}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="confirmPassword"
            placeholder="Confirm Password"
            hasFeedback
          />
          <Field
            InputType={Checkbox}
            component={FormInputField}
            name="terms"
            innerData="I agree to FAKE Terms of Service"
          />
          <Form.Item style={{ marginBottom: 'unset' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              className={_s.RegisterFormButton}
            >
              Register
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
