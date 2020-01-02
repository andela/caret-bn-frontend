import {
  GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL, SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL, PROCESS_REQUEST_SUCCESS, PROCESS_REQUEST_ERROR,
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
    dispatch(requestType(GET_REQUESTS_SUCCESS, response.data.data.reverse()));
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

export const searchRequestAction = (searchParams) => (dispatch) => backendCall.get(`/requests/search${searchParams}`, { headers })
  .then((response) => {
    dispatch(requestType(SEARCH_REQUESTS_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(requestType(SEARCH_REQUESTS_FAIL, error.response.data));
  });

export const processRequestAction = (action, id) => (dispatch) => backendCall.patch(`/requests/manager/${action}/${id}`, {}, { headers })
  .then((response) => {
    dispatch(requestType(PROCESS_REQUEST_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(requestType(PROCESS_REQUEST_ERROR, error.response.data));
  });
