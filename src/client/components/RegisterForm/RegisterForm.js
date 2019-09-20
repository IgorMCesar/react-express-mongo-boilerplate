import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

import { FormInputField } from '../FormInputField/FormInputField';

import validators from '../../validators/validators';
import { mutations } from '../../graphql/graphql';

import EmailSent from '../EmailSent/EmailSent';
import _s from './RegisterForm.less';

const RegisterForm = props => {
  const [registeredEmail, setRegisteredEmail] = useState();

  const [SignUp] = useMutation(mutations.SIGN_UP);

  const handleSubmitForm = async (values, actions) => {
    const { email, password, name, username } = values;
    const { setErrors, setSubmitting } = actions;

    SignUp({ variables: { email, password, name, username } }).then(
      res => {
        setRegisteredEmail(email);
      },
      err => {
        const errors = {};

        err.graphQLErrors.map(x => {
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

  if (registeredEmail) {
    return <EmailSent email={registeredEmail} />;
  } else {
    return (
      <Card className={_s.RegisterFormCard}>
        <p style={{ fontWeight: 'bold', fontSize: '1.05rem', textAlign: 'center' }}>
          <Icon style={{ paddingRight: '5px' }} type="user-add" /> Register
        </p>
        <Formik
          initialValues={{
            username: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false
          }}
          validationSchema={validators.user.registerSchema}
          validateOnBlur={false}
          onSubmit={(values, actions) => handleSubmitForm(values, actions)}
          render={formikProps => {
            const { isSubmitting, handleSubmit } = formikProps;

            return (
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
                <Field InputType={Checkbox} component={FormInputField} name="terms">
                  I agree to FAKE Terms of Service
                </Field>

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
            );
          }}
        />
      </Card>
    );
  }
};

export default RegisterForm;
