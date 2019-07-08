/* eslint-disable no-unused-vars */
const Joi = require('joi');
const mongoose = require('mongoose');
const { UserInputError, ApolloError } = require('apollo-server-express');
const { User } = require('../../models/models');
const validators = require('../validators/validators');
const Auth = require('../../helpers/auth');
const { verifyToken, sendEmailWithToken } = require('../../helpers/token');

module.exports = {
  Query: {
    // TODO: projection, pagination, sanitization
    users: (root, args, context, info) => User.find({}),
    user: async (root, args, context, info) => {
      // TODO: projection
      await Joi.validate(args, validators.user.findUser);

      return User.findById(args.id);
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      await Joi.validate(args, validators.user.signUp, { abortEarly: false });

      const user = await User.create(args);

      await sendEmailWithToken(user, 'signUp');

      return user;
    },
    resendSignUpToken: async (root, args, context, info) => {
      await Joi.validate(args, validators.user.resendSignUpToken, { abortEarly: false });

      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new UserInputError('Email not found.');
      } else if (user.isVerified) {
        throw new ApolloError('User already verified.', 'USER_ALREADY_VERIFIED');
      }

      const token = await sendEmailWithToken(user.email, 'signUp');

      return !!token._id;
    },
    verifyUser: async (root, args, context, info) => {
      // await Joi.validate(args, validators.token.)

      const verifiedToken = await verifyToken(args.token, 'signUp');

      const res = await User.updateOne({ _id: verifiedToken.user }, { isVerified: true });

      return !!res.nModified > 0;
    },
    LogIn: async (root, args, context, info) => {
      await Joi.validate(args, validators.user.LogIn, { abortEarly: false });

      const user = await Auth.attemptLogIn(args.email, args.password);

      context.req.session.userId = user.id;
      context.req.session.userRole = user.role;

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
        { _id: context.req.session.userId },
        { password: newPassword }
      );

      return res.nModified > 0;
    }
  }
};
