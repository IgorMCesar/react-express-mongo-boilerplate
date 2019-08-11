import React from 'react';
import { Form } from 'antd';

export const FormInputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  InputType,
  hasFeedback,
  hideErrorMessage,
  ...props
}) => {
  const errorMessage = hideErrorMessage ? false : touched[field.name] && errors[field.name];
  let inputStatus;

  if (errorMessage) {
    inputStatus = 'error';
  } else if (touched[field.name] && field.value) {
    inputStatus = 'success';
  }

  return (
    <Form.Item help={errorMessage} validateStatus={inputStatus} hasFeedback={hasFeedback}>
      <InputType {...field} {...props}>
        {props.children}
      </InputType>
    </Form.Item>
  );
};
