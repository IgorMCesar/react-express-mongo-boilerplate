import * as yup from 'yup';

const validMessage = `Please provide a valid email and password`;

export const loginSchema = yup.object().shape({
  email: yup
    .string(validMessage)
    .min(3)
    .max(255, validMessage)
    .email(validMessage)
    .required('Please enter your email and password.'),
  password: yup
    .string(validMessage)
    .min(8, validMessage)
    .max(50, validMessage)
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, validMessage)
    .required('Please enter your email and password.')
});

const requiredMessage = field => `${field} is required`;
const minMessage = min => `Must have at least ${min} characters`;
const maxMessage = max => `Cannot have more than ${max} characters`;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, minMessage(3))
    .max(255, maxMessage(255))
    .email('Must be a valid email')
    .required(requiredMessage('E-mail')),
  password: yup
    .string()
    .min(8)
    .max(50, maxMessage(50))
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
      'Must have at least one letter and one digit.'
    )
    .required(requiredMessage('Password')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(requiredMessage('Password confimation')),
  username: yup
    .string()
    .min(4, minMessage(4))
    .max(30, maxMessage(30))
    .matches(/^[a-zA-Z0-9]*$/, 'Must only contain letters and numbers')
    .required(requiredMessage('Username')),
  name: yup
    .string()
    .min(4, minMessage(4))
    .max(255, maxMessage(255))
    .required(requiredMessage('Name')),
  terms: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
});
