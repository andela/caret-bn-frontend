import {
  MANAGER_GET_REQUESTS_SUCCESS, MANAGER_GET_REQUESTS_FAIL, MANAGER_SEARCH_REQUESTS_SUCCESS, MANAGER_SEARCH_REQUESTS_FAIL,
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

export const getManagerRequestAction = () => (dispatch) => backendCall.get('/requests/manager', { headers })
  .then((response) => {
    dispatch(requestType(MANAGER_GET_REQUESTS_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(requestType(MANAGER_GET_REQUESTS_FAIL, error.response.data));
  });

export const managerSearchRequestAction = (searchParams) => (dispatch) => backendCall.get(`/requests/manager/search${searchParams}`, { headers })
  .then((response) => {
    dispatch(requestType(MANAGER_SEARCH_REQUESTS_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(requestType(MANAGER_SEARCH_REQUESTS_FAIL, error.response.data));
  });
