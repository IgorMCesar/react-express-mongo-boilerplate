import { showToastr } from '../toastr/showToastr';
import { SUCCESS } from '../../constants/toastr';

export const SET_AUTH_USER = 'SET_AUTH_USER';

export const setAuthUser = user => dispatch => {
  dispatch(showToastr(SUCCESS, 'Logged in successfully'));
  dispatch({
    type: SET_AUTH_USER,
    user
  });
};
