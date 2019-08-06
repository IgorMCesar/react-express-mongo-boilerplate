import { hideToastr } from './hideToastr';

export const SHOW_TOASTR = 'SHOW_TOASTR';

export const showToastr = (category, message) => dispatch => {
  dispatch({
    type: SHOW_TOASTR,
    category,
    message
  });
  setTimeout(() => {
    dispatch(hideToastr());
  }, 4000);
};
