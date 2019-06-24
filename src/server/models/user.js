/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: ({ value }) => `Email ${value} has already been taken.` // TODO: security
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: ({ value }) => `Username ${value} has already been taken.` // TODO: security
      }
    },
    name: String,
    password: String
  },
  {
    timestamps: true
  }
);

userSchema.statics.doesntExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

const User = model('User', userSchema);

module.exports = User;
