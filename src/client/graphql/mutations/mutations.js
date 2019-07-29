import gql from 'graphql-tag';

export const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    LogIn(email: $email, password: $password) {
      id
      name
      email
      username
      role
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $username: String!, $name: String!) {
    signUp(email: $email, password: $password, username: $username, name: $name) {
      email
    }
  }
`;
