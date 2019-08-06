import { showToastr } from '../toastr/showToastr';
import { SUCCESS } from '../../constants/toastr';

export const REMOVE_AUTH_USER = 'REMOVE_AUTH_USER';

export const removeAuthUser = () => dispatch => {
  dispatch(showToastr(SUCCESS, 'Logged out successfully'));
  dispatch({
    type: REMOVE_AUTH_USER
  });
};
