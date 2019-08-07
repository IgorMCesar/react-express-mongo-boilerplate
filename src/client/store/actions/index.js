import * as setAuthUser from './auth/setAuthUser';
import * as removeAuthUser from './auth/removeAuthUser';
import * as setFirstAuthState from './auth/setFirstAuthState';

const actions = {
  ...setAuthUser,
  ...removeAuthUser,
  ...setFirstAuthState
};

export default actions;
