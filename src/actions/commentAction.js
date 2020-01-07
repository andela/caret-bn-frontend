import {
  SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, GET_COMMENTS_FAIL, SET_COMMENT_DELETE,
} from './types';
import backendCall from '../helpers/backendCall';
import { getToken } from '../helpers/authHelper';

const profileType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const setComment = (userComment, requestId) => (dispatch) => backendCall.post(`/comments/${requestId}`, userComment, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      profileType(SET_COMMENT_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      profileType(SET_COMMENT_ERROR, error.response.data),
    );
  });

export const getComment = (requestId) => (dispatch) => backendCall.get(`/comments/${requestId}`, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      profileType(GET_COMMENTS, response),
    );
  }).catch((error) => {
    dispatch(
      profileType(GET_COMMENTS_FAIL, error.response.data),
    );
  });
