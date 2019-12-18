import { MAKE_REQUEST_SUCCESS, MAKE_REQUEST_FAILURE, SHOW_ALERT } from './types';
import backendCall from '../helpers/backendCall';
import { getToken } from '../helpers/authHelper';

const token = getToken();

const requestType = (type, payload) => ({
  type,
  payload,
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export const sendRequest = (request) => (dispatch) => backendCall.post('/requests', request, { headers }).then((response) => {
  dispatch(requestType(MAKE_REQUEST_SUCCESS, response.data));
  dispatch(requestType(SHOW_ALERT));
}).catch((error) => {
  dispatch(requestType(MAKE_REQUEST_FAILURE, error.response));
  dispatch(requestType(SHOW_ALERT));
});
