import {
  ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE, ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE,
  SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE, UPDATE_ACCOMMODATION_SUCCESS, UPDATE_ACCOMMODATION_FAILURE,
  RESET_ACCOMMODATION_STATUS, SHOW_ALERT,
} from './types';
import backendCall from '../helpers/backendCall';
import { getToken } from '../helpers/authHelper';

const accommodationType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${token}`,
};

const createAccommodation = (accommodationDetails) => async (dispatch) => {
  try {
    const res = await backendCall.post('/accommodations', accommodationDetails, { headers });
    dispatch(accommodationType(ADD_ACCOMMODATION_SUCESS, res.data));
  } catch (error) {
    dispatch(accommodationType(ADD_ACCOMMODATION_FAILURE, error.response));
  }
};

export default createAccommodation;
export const GetAllAccommodation = () => (dispatch) => {
  const { token } = localStorage;
  const AuthUser = 'Bearer '.concat(token);
  return backendCall.get('accommodations', { headers: { Authorization: AuthUser } })
    .then((res) => {
      const response = res.data;
      dispatch(
        accommodationType(ALL_ACCOMMODATION_SUCCESS, response),
      );
    }).catch((error) => {
      dispatch(
        accommodationType(ALL_ACCOMMODATION_FAILURE, error.response.data),
      );
    });
};

export const GetSingleAccommodation = (slug) => (dispatch) => {
  const AuthUser = 'Bearer '.concat(token);
  return backendCall.get(`accommodations/${slug}`, { headers: { Authorization: AuthUser } })
    .then((res) => {
      const response = res.data;
      dispatch(
        accommodationType(SINGLE_ACCOMMODATION_SUCCESS, response),
      );
    }).catch((error) => {
      dispatch(
        accommodationType(SINGLE_ACCOMMODATION_FAILURE, error.response.data),
      );
    });
};

export const updateAccommodation = (updates, accommodationId) => async (dispatch) => {
  try {
    const res = await backendCall.patch(`/accommodations/${accommodationId}/edit`, updates, { headers });
    dispatch(accommodationType(UPDATE_ACCOMMODATION_SUCCESS, res.data));
    dispatch(accommodationType(SHOW_ALERT));
  } catch (error) {
    dispatch(accommodationType(UPDATE_ACCOMMODATION_FAILURE, error.response));
    dispatch(accommodationType(SHOW_ALERT));
  }
};

export const resetAccommodationState = () => (dispatch) => {
  dispatch(accommodationType(RESET_ACCOMMODATION_STATUS, null));
};
