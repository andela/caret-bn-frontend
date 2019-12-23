import jwt from 'jsonwebtoken';
import {
  GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
} from './types';
import backendCall from '../helpers/backendCall';
import 'regenerator-runtime';
import authHelper, { checkEmail } from '../helpers/authHelper';

const { getToken } = authHelper;

const profileType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${token}`,
};

export const GetUserProfile = () => (dispatch) => backendCall.get(`/users/profile/${checkEmail()}`, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      profileType(GET_PROFILE, response),
    );
  }).catch((error) => {
    dispatch(
      profileType(PROFILE_ERROR, error.response.data),
    );
  });

export const UpdateUserProfile = (userData) => (dispatch) => backendCall.patch(`/users/profile/${checkEmail()}`, userData,
  {
    headers,
  })
  .then((res) => {
    const response = res.data;
    dispatch(
      profileType(UPDATE_PROFILE_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      profileType(UPDATE_PROFILE_FAIL, error.response),
    );
  });
