export const HIDE_TOASTER = 'HIDE_TOASTER';

export const hideToastr = () => dispatch => {
  return dispatch({
    type: HIDE_TOASTER
  });
};
