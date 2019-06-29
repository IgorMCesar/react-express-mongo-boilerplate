const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    user(id: ID!): User @auth
    users: [User!]! @auth
  }

  extend type Mutation {
    signUp(email: String!, username: String!, name: String!, password: String!): User @guest
    LogIn(email: String!, password: String!): User @guest
    LogOut: Boolean @auth
    ChangePassword(password: String!, newPassword: String!): Boolean @auth
  }
`;
