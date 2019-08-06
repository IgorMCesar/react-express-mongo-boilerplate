import * as showToastr from '../actions/toastr/showToastr';
import * as hideToastr from '../actions/toastr/hideToastr';

const defaultState = {
  toastrIsShowing: false,
  category: undefined,
  message: undefined
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case showToastr.SHOW_TOASTR:
      return {
        ...state,
        toastrIsShowing: true,
        category: action.category,
        message:
          typeof action.message === 'string' ? action.message : JSON.stringify(action.message)
      };
    case hideToastr.HIDE_TOASTER:
      return {
        ...state,
        toastrIsShowing: false
      };
    default:
      return state;
  }
};
