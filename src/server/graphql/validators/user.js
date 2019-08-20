import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

Joi.objectId = JoiObjectId(Joi);

const email = Joi.string()
  .min(3)
  .max(255)
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
  .min(4)
  .max(255)
  .required()
  .label('Name');

const password = Joi.string()
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
  })
  .required()
  .label('Password');

const token = Joi.string()
  .token()
  .length(32);

export const findUser = Joi.object().keys({
  id: Joi.objectId()
});

export const signUp = Joi.object().keys({
  email,
  username,
  name,
  password
});

export const LogIn = Joi.object().keys({
  email,
  password
});

export const ChangePassword = Joi.object().keys({
  password,
  newPassword: password
});

export const sendUserToken = Joi.object().keys({
  email
});

export const verifyUser = Joi.object().keys({
  token
});

export const ChangePasswordWithToken = Joi.object().keys({
  token,
  newPassword: password
});
