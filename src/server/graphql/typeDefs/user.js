const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    name: String!
    createdAt: String!
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    signUp(email: String!, username: String!, name: String!, password: String!): User
  }
`;
