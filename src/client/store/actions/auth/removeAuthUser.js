import { message } from 'antd';

export const REMOVE_AUTH_USER = 'REMOVE_AUTH_USER';

export const removeAuthUser = () => dispatch => {
  message.info('Logged out successfully');
  dispatch({
    type: REMOVE_AUTH_USER
  });
};
