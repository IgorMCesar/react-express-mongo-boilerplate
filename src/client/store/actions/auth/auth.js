import * as setAuthUser from './setAuthUser';
import * as removeAuthUser from './removeAuthUser';
import * as setFirstAuthState from './setFirstAuthState';

const authActions = {
  ...setAuthUser,
  ...removeAuthUser,
  ...setFirstAuthState
};

export default authActions;
