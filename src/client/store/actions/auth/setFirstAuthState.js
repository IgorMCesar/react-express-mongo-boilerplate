export const SET_FIRST_AUTH_STATE = 'SET_FIRST_AUTH_STATE';

export const setFirstAuthState = (loggedIn, user) => ({
  type: SET_FIRST_AUTH_STATE,
  user,
  loggedIn
});
