import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import LoginForm from '../../components/LoginForm/LoginForm';
import _s from './Home.less';

const { Header, Footer, Content } = Layout;

const HomePage = () => (
  <Layout className="layout" style={{ minHeight: '100vh' }}>
    <Header>
      <Link to="/dashboard">Dashboard</Link>
    </Header>
    <Content className={_s.Content}>
      <LoginForm />
    </Content>
    <Footer style={{ textAlign: 'center' }}>React Node Boilerplate by Igor Cesar</Footer>
  </Layout>
);

export default HomePage;
