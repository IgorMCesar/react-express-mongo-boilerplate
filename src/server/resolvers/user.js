/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { UserInputError } = require('apollo-server-express');

const { User } = require('../models');

module.exports = {
  Query: {
    users: (root, args, context, info) => {
      // TODO: auth, projection, pagination, sanitization
      console.log('a');
      return User.find({});
    },
    user: (root, args, context, info) => {
      // TODO: auth, projection
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID.`);
      }

      return User.findById(args.id);
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      // TODO: not auth

      // Validation
      console.log('b');
      return User.create(args);
    }
  }
};
