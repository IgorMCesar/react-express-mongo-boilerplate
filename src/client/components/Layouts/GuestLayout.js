import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import _s from './Layouts.less';

const { Header, Footer, Content } = Layout;

const GuestLayout = props => (
  <Layout className="layout" style={{ minHeight: '100vh' }}>
    <Header style={{ height: 'unset' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['/']}
        selectedKeys={[props.location.pathname]}
        style={{ lineHeight: '65px' }}
      >
        <Menu.Item key="logo">
          <Link to="/">
            <img src="/public/images/logo.png" alt="menu" className={_s.logo} />
          </Link>
        </Menu.Item>
        <Menu.Item key="/login" className={_s.login}>
          <Link to="/login" style={{ fontWeight: '500' }}>
            Log In
            <Icon type="login" style={{ marginLeft: '10px' }} className={_s.loginIcon} />
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content className={_s.Content}>{props.children}</Content>
    <Footer style={{ textAlign: 'center' }}>MER(A)N - FullStack Boilerplate by IgorMCesar</Footer>
  </Layout>
);

export default withRouter(GuestLayout);
