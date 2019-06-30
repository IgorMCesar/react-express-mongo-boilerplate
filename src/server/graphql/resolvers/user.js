/* eslint-disable no-unused-vars */
const Joi = require('joi');
const mongoose = require('mongoose');
const { UserInputError } = require('apollo-server-express');
const { User } = require('../../models');
const validators = require('../validators');
const Auth = require('../../helpers/auth');

module.exports = {
  Query: {
    // TODO: projection, pagination, sanitization
    users: (root, args, context, info) => User.find({}),
    user: async (root, args, context, info) => {
      // TODO: projection
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user ID.`);
      }
      // await Joi.validate(args, validators.object.objectId);

      return User.findById(args.id);
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      await Joi.validate(args, validators.user.signUp, { abortEarly: false });

      args.role = 'USER';

      const user = await User.create(args);

      // TODO: Send Email to verify
      context.req.session.userInfo = {
        id: user.id,
        role: user.role
      };

      return user;
    },
    LogIn: async (root, args, context, info) => {
      await Joi.validate(args, validators.user.LogIn, { abortEarly: false });

      const user = await Auth.attemptLogIn(args.email, args.password);

      context.req.session.userInfo = {
        id: user.id,
        role: user.role
      };

      return user;
    },
    LogOut: async (root, args, context, info) => Auth.LogOut(context.req, context.res),
    ChangePassword: async (root, args, context, info) => {
      await Joi.validate(args, validators.user.ChangePassword, { abortEarly: false });

      const newPassword = await Auth.verifyPasswordChange(
        context.req,
        args.password,
        args.newPassword
      );

      const res = await User.updateOne(
        { _id: context.req.session.userInfo.id },
        { password: newPassword }
      );

      return res.nModified > 0;
    }
  }
};
