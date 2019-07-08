const { gql } = require('apollo-server-express');

module.exports = gql`
  directive @auth on FIELD_DEFINITION
  directive @hasRole(role: Role = [USER, ADMIN]) on OBJECT | FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;
