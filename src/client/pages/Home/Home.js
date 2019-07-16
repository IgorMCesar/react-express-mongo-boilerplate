import React from 'react';
import { Layout } from 'antd';

import LoginForm from '../../components/LoginForm';
import _s from './Home.less';

const { Header, Footer, Content } = Layout;

const HomePage = () => (
  <Layout className="layout" style={{ minHeight: '100vh' }}>
    <Header>Teste</Header>
    <Content className={_s.Content}>
      <LoginForm />
    </Content>
    <Footer style={{ textAlign: 'center' }}>React Node Boilerplate by Igor Cesar</Footer>
  </Layout>
);

export default HomePage;
