import {
  MANAGER_GET_REQUESTS, MANAGER_GET_REQUESTS_ERROR,
  MANAGER_SEARCH_REQUESTS, MANAGER_SEARCH_REQUESTS_ERROR,
  SHOW_ALERT,
} from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const token = getToken();

const managerType = (type, payload) => ({
  type,
  payload,
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getRequests = () => (dispatch) => backendCall.get('/requests/manager/', { headers }).then((response) => {
  dispatch(managerType(MANAGER_GET_REQUESTS, response.data));
}).catch((error) => {
  dispatch(managerType(MANAGER_GET_REQUESTS_ERROR, error.response));
  dispatch(managerType(SHOW_ALERT));
});

export const searchRequests = (params) => (dispatch) => backendCall.get(`/requests/manager/search?${params}`, { headers }).then((response) => {
  console.log('res', response);
  dispatch(managerType(MANAGER_SEARCH_REQUESTS, response.data));
}).catch((error) => {
  dispatch(managerType(MANAGER_SEARCH_REQUESTS_ERROR, error.response));
  dispatch(managerType(SHOW_ALERT));
});
