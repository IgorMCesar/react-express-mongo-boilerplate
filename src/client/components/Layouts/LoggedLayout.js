import React from 'react';
import { Layout, Menu, Avatar, Icon } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import * as actionTypes from '../../store/constants/actionTypes';

import _s from './Layouts.less';

const { SubMenu } = Menu;
const { Header, Footer, Content } = Layout;

const LOG_OUT = gql`
  mutation LogOut {
    LogOut
  }
`;

class LoggedLayout extends React.Component {
  handleClick = (e, LogOut) => {
    if (e.key === 'signOut') {
      LogOut()
        .then(res => {
          this.props.onLogOut();
          this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }
    this.setState({
      current: e.key
    });
  };

  render() {
    const { children } = this.props;
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <Mutation mutation={LOG_OUT}>
            {(LogOut, { data, loading, error }) => {
              return (
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                  onClick={e => this.handleClick(e, LogOut)}
                >
                  <Menu.Item key="1">
                    <Link to="/">Dashboard</Link>
                  </Menu.Item>
                  <SubMenu
                    title={
                      <div>
                        <Avatar size="medium" icon="user" className={_s.UserAvatar} />
                        <Icon type="down" style={{ marginLeft: '10px' }} />
                      </div>
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
        <Content className={_s.Content}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>React Node Boilerplate by IgorMCesar</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authState.user,
    loggedIn: state.authState.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch({ type: actionTypes.REMOVE_AUTH_USER })
  };
};

const connectedLoggedLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedLayout);

export default withRouter(connectedLoggedLayout);
