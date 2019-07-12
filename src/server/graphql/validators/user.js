const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const email = Joi.string()
  .email()
  .required()
  .label('Email');

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .max(254)
  .required()
  .label('Name');

const password = Joi.string()
  .required()
  .label('Password')
  .min(8)
  .max(50)
  .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
  .options({
    language: {
      string: {
        regex: {
          base: 'must have at least one letter and one digit.'
        }
      }
    }
  });

const token = Joi.string()
  .token()
  .length(32);

exports.findUser = Joi.object().keys({
  id: Joi.objectId()
});

exports.signUp = Joi.object().keys({
  email,
  username,
  name,
  password
});

exports.LogIn = Joi.object().keys({
  email,
  password
});

exports.ChangePassword = Joi.object().keys({
  password,
  newPassword: password
});

exports.sendUserToken = Joi.object().keys({
  email
});

exports.verifyUser = Joi.object().keys({
  token
});

exports.ChangePasswordWithToken = Joi.object().keys({
  token,
  newPassword: password
});
