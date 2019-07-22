import React from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import GuestLayout from '../../components/Layouts/GuestLayout';
// import _s from './Login.less';

const LoginPage = () => (
  <GuestLayout>
    <LoginForm />
  </GuestLayout>
);

export default LoginPage;
