import {
  SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './types';
import backendCall from '../helpers/backendCall';
import 'regenerator-runtime';
import storeToken from '../helpers/authHelper';

const authType = (type, payload) => ({
  type,
  payload,
});

const host = window.location.origin;

export const signupAction = (userData) => (dispatch) => backendCall.post('/users/register', { ...userData, host })
  .then((response) => {
    dispatch(authType(SIGNUP_SUCCESS, response.data));
  })
  .catch((err) => {
    dispatch(authType(SIGNUP_FAIL, err.response.data));
  });

const userLogin = ({ email, password }) => async (dispatch) => {
  try {
    const res = await backendCall.post('/users/login', { email, password });
    storeToken(res.data.data.token);
    dispatch(authType(LOGIN_SUCCESS, res.data));
  } catch (error) {
    dispatch(authType(LOGIN_FAILURE, error.response));
  }
};

export default userLogin;
