import { GET_LOCATIONS, GET_LOCATIONS_ERROR } from './types';
import authHelper from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const { getToken } = authHelper;

const token = getToken();

const locationsType = (type, payload) => ({
  type,
  payload,
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getLocations = () => async (dispatch) => {
  try {
    const response = await backendCall.get('/locations', { headers });
    dispatch(locationsType(GET_LOCATIONS, response.data));
  } catch (error) {
    dispatch(locationsType(GET_LOCATIONS_ERROR, error.response));
  }
};
