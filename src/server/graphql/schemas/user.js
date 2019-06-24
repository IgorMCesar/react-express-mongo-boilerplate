const Joi = require('joi');

module.exports = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .label('Email'),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .required()
    .label('Username'),
  name: Joi.string()
    .max(254)
    .required()
    .label('Name'),
  password: Joi.string()
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
    })
});
