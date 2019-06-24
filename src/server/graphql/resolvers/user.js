/* eslint-disable no-unused-vars */
const Joi = require('joi');
const mongoose = require('mongoose');
const { hash } = require('bcryptjs');
const { UserInputError } = require('apollo-server-express');
const { signUp } = require('../schemas');
const { User } = require('../../models');

// async function doesntExist(args) {
//   let existingUser = await User.findOne({ email: args.email });
//   if (existingUser) {
//     throw new Error(`Email ${args.email} has already been taken.`);
//   }
//   existingUser = await User.findOne({ email: args.username });
//   if (existingUser) {
//     throw new Error(`Username ${args.username} has already been taken.`);
//   }
// }

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
    signUp: async (root, args, context, info) => {
      await Joi.validate(args, signUp, { abortEarly: false });
      // await doesntExist(args);

      const password = await hash(args.password, 12);

      return User.create({ ...args, password });
    }
  }
};
