import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router';
import { mutations } from '../../graphql/graphql';
import actions from '../../store/actions/actions';

import _s from './Layouts.less';

const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;

const LoggedLayout = props => {
  const [LogOut] = useMutation(mutations.LOG_OUT);

  const handleLogOut = e => {
    if (e.key === 'LogOut') {
      LogOut()
        .then(res => {
          props.removeAuthUser();
          message.success('Logged out successfully');
          props.history.push('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ height: 'unset' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          selectedKeys={[location.pathname]}
          style={{ lineHeight: '65px' }}
        >
          <Menu.Item key="logo">
            <Link to="/">
              <img src="/public/images/logo.png" alt="menu" className={_s.logo} />
            </Link>
          </Menu.Item>
          <Menu.Item key="/">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <SubMenu
            title={
              <>
                <Avatar size="medium" icon="user" className={_s.UserAvatar} />
                <Icon type="down" style={{ marginLeft: '10px' }} />
              </>
            }
            style={{ float: 'right' }}
          >
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item onClick={e => handleLogOut(e)} key="LogOut">
              Sign Out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content className={_s.Content}>{props.children}</Content>
      <Footer style={{ textAlign: 'center' }}>MER(A)N - FullStack Boilerplate by IgorMCesar</Footer>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loggedIn: state.auth.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeAuthUser: actions.removeAuthUser
    },
    dispatch
  );
};

LoggedLayout.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  removeAuthUser: PropTypes.func.isRequired
};

const connectedLoggedLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedLayout);

export default withRouter(connectedLoggedLayout);
