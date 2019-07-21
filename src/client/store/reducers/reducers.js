import { combineReducers } from 'redux';

import authReducer from './authReducer';

const Reducers = combineReducers({
  authState: authReducer
});

export default Reducers;
