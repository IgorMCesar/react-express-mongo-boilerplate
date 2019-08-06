import * as setAuthUser from './auth/setAuthUser';
import * as removeAuthUser from './auth/removeAuthUser';
import * as setFirstAuthState from './auth/setFirstAuthState';
import * as showToastr from './toastr/showToastr';
import * as hideToastr from './toastr/hideToastr';

const actions = {
  ...setAuthUser,
  ...removeAuthUser,
  ...setFirstAuthState,
  ...showToastr,
  ...hideToastr
};

export default actions;
