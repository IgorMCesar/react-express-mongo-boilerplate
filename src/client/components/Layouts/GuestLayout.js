import React from 'react';
import { Layout, Menu } from 'antd';

import _s from './Layouts.less';

const { Header, Footer, Content } = Layout;

const GuestLayout = props => (
  <Layout className="layout" style={{ minHeight: '100vh' }}>
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      />
    </Header>
    <Content className={_s.Content}>{props.children}</Content>
    <Footer style={{ textAlign: 'center' }}>React Node Boilerplate by IgorMCesar</Footer>
  </Layout>
);

export default GuestLayout;
