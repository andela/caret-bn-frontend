import {
  SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, GET_COMMENTS_FAIL, COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_ERROR, COMMENT_EDIT_ERROR, COMMENT_EDIT_SUCCESS,
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

export const deleteComment = (commentId) => (dispatch) => backendCall.delete(`/requests/comments/${commentId}`, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      profileType(COMMENT_DELETE_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      profileType(COMMENT_DELETE_ERROR, error.response.data),
    );
  });

export const editComment = (comment, commentId) => (dispatch) => backendCall.put(`/requests/comments/${commentId}`, comment, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      profileType(COMMENT_EDIT_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      profileType(COMMENT_EDIT_ERROR, error.response.data),
    );
  });
