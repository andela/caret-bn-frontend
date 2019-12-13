import {
  GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL,
} from './types';
import backendCall from '../helpers/backendCall';
import { getToken } from '../helpers/authHelper';

const requestType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const getRequestsAction = () => (dispatch) => backendCall.get('/requests', { headers })
  .then((response) => {
    dispatch(requestType(GET_REQUESTS_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(requestType(GET_REQUESTS_FAIL, error.response.data));
  });

export const singleRequestAction = (requestId) => (dispatch) => backendCall.get(`/requests/${requestId}`, { headers })
  .then((response) => {
    dispatch(requestType(SINGLE_REQUEST_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(requestType(SINGLE_REQUEST_FAIL, error.response.data));
  });
