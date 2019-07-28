import * as yup from 'yup';

const validField = 'Please provide a valid username and password.';
const requiredField = 'Please enter your username and password.';

export const loginSchema = yup.object().shape({
  email: yup
    .string(validField)
    .min(3, validField)
    .max(255, validField)
    .email(validField)
    .required(requiredField),
  password: yup
    .string(validField)
    .min(3, validField)
    .max(255, validField)
    .required(requiredField)
});
