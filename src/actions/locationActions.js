import {
  GET_LOCATIONS, GET_LOCATIONS_ERROR, TOP_DESTINATIONS, TOP_DESTINATIONS_ERROR,
} from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

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
export const getTopDestinations = () => async (dispatch) => {
  try {
    const response = await backendCall.get('/destinations/most-visited', { headers });
    dispatch(locationsType(TOP_DESTINATIONS, response.data));
  } catch (error) {
    dispatch(locationsType(TOP_DESTINATIONS_ERROR, error.response));
  }
};
