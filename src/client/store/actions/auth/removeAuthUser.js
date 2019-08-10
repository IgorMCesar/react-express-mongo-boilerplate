export const REMOVE_AUTH_USER = 'REMOVE_AUTH_USER';

export const removeAuthUser = () => dispatch => {
  dispatch({
    type: REMOVE_AUTH_USER
  });
};
