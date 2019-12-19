import {
  GET_USERS, GET_USERS_ERROR, GET_SPECIFIC_USER, GET_SPECIFIC_USER_ERROR,
} from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const userType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await backendCall.get('/admin/users', { headers });
    dispatch(userType(GET_USERS, res.data));
  } catch (error) {
    dispatch(userType(GET_USERS_ERROR, error.response));
  }
};

export const getSpecificUser = (userId) => async (dispatch) => {
  try {
    const res = await backendCall.get(`/admin/users/${userId}`, { headers });
    dispatch(userType(GET_SPECIFIC_USER, res.data));
  } catch (error) {
    dispatch(userType(GET_SPECIFIC_USER_ERROR, error.response));
  }
};
