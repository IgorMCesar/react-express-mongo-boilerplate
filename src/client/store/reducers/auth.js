import authActions from '../actions/auth/auth';

const initialState = {
  user: null,
  loggedIn: false,
  firstAuthValidationDone: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions.SET_AUTH_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case authActions.REMOVE_AUTH_USER:
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    case authActions.SET_FIRST_AUTH_STATE:
      return {
        ...state,
        user: action.user,
        loggedIn: action.loggedIn,
        firstAuthValidationDone: true
      };
    default:
      return state;
  }
};
