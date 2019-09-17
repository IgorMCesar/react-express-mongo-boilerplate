import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Avatar, Icon, message } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router';
import actions from '../../store/actions/actions';

import _s from './Layouts.less';

const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;

const LOG_OUT = gql`
  mutation LogOut {
    LogOut
  }
`;

const LoggedLayout = props => {
  const handleClick = (e, LogOut) => {
    if (e.key === 'signOut') {
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
        <Mutation mutation={LOG_OUT}>
          {(LogOut, { data, loading, error }) => {
            return (
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['/']}
                selectedKeys={[location.pathname]}
                style={{ lineHeight: '65px' }}
                onClick={e => handleClick(e, LogOut)}
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
                  <Menu.Item key="signOut">Sign Out</Menu.Item>
                </SubMenu>
              </Menu>
            );
          }}
        </Mutation>
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
