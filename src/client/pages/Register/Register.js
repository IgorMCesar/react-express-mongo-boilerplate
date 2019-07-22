import React from 'react';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import GuestLayout from '../../components/Layouts/GuestLayout';
// import _s from './Register.less';

const RegisterPage = () => (
  <GuestLayout>
    <RegisterForm />
  </GuestLayout>
);

export default RegisterPage;
