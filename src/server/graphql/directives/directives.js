const AuthDirective = require('./auth');
const GuestDirective = require('./guest');
const RoleDirective = require('./role');

module.exports = {
  auth: AuthDirective,
  guest: GuestDirective,
  hasRole: RoleDirective
};
