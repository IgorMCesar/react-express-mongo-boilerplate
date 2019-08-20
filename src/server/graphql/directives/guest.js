import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { ensureLoggedOut } from '../../helpers/auth';

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

export default GuestDirective;
