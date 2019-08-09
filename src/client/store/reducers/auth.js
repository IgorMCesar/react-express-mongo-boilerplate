import * as setAuthUser from '../actions/auth/setAuthUser';
import * as removeAuthUser from '../actions/auth/removeAuthUser';
import * as setFirstAuthState from '../actions/auth/setFirstAuthState';

const initialState = {
  user: null,
  loggedIn: false,
  firstAuthValidationDone: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setAuthUser.SET_AUTH_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case removeAuthUser.REMOVE_AUTH_USER:
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    case setFirstAuthState.SET_FIRST_AUTH_STATE:
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
