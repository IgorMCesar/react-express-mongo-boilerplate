import * as actionTypes from '../constants/actionTypes';

const initialState = {
  user: null,
  loggedIn: false,
  firstAuthValidationDone: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_USER:
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };
    case actionTypes.SET_FIRST_AUTH_STATE:
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

export default authReducer;
