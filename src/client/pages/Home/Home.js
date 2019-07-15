import React from 'react';
// import gql from 'graphql-tag';
import { Layout } from 'antd';

import LoginForm from '../../components/LoginForm';
import _s from './Home.less';
// import { Query, Mutation } from 'react-apollo';

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

// const GET_USERS = gql`
//   query getUsers {
//     users {
//       id
//     }
//   }
// `;

// const LOG_IN = gql`
//   mutation LogIn($email: String!, $password: String!) {
//     LogIn(email: $email, password: $password) {
//       id
//     }
//   }
// `;

// let input;
// let input2;
// <Mutation mutation={LOG_IN}>
//   {LogIn => (
//     <div>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           LogIn({ variables: { email: input.value, password: input2.value } });
//           input.value = '';
//         }}
//       >
//         <input
//           ref={(node) => {
//             input = node;
//           }}
//         />
//         <input
//           ref={(node) => {
//             input2 = node;
//           }}
//         />
//         <button type="submit">Add Todo</button>
//       </form>
//     </div>
//   )}
// </Mutation>
// <Query query={GET_USERS}>
//   {({ loading, error, data }) => {
//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;

//     return (
//       <div>
//         {data.users.map(user => (
//           <p key={user.id}>{user.id}</p>
//         ))}
//       </div>
//     );
//   }}
// </Query>
