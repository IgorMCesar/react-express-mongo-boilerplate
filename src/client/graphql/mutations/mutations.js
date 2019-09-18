import gql from 'graphql-tag';

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $username: String!, $name: String!) {
    signUp(email: $email, password: $password, username: $username, name: $name) {
      email
    }
  }
`;

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

export const LOG_OUT = gql`
  mutation LogOut {
    LogOut
  }
`;

export const VERIFY_LOGGED_IN = gql`
  mutation CheckIfLoggedIn {
    CheckIfLoggedIn {
      id
      name
      email
      username
      role
    }
  }
`;
