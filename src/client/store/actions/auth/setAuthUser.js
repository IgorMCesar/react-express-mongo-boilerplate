import { message } from 'antd';

export const SET_AUTH_USER = 'SET_AUTH_USER';

export const setAuthUser = user => dispatch => {
  message.info('Logged in successfully');
  dispatch({
    type: SET_AUTH_USER,
    user
  });
};
