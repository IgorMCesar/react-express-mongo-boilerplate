const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');
const { ensureLoggedOut } = require('../../helpers/auth');

class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function(...args) {
      const context = args[2];

      ensureLoggedOut(context.req);

      return resolve.apply(this, args);
    };
  }
}

module.exports = GuestDirective;
