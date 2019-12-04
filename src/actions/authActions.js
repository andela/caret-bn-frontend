import { SIGNUP_SUCCESS, SIGNUP_FAIL } from './types';
import backendCall from '../helpers/backendCall';

const authType = (type, payload) => ({
  type,
  payload,
});

export const signupAction = (userData) => (dispatch) => backendCall.post('/users/register', userData)
  .then((response) => {
    dispatch(authType(SIGNUP_SUCCESS, response.data));
  })
  .catch((err) => {
    dispatch(authType(SIGNUP_FAIL, err.response.data));
  });
