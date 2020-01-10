
import {
  ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE, ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE,
  SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE, UPDATE_ACCOMMODATION_SUCCESS, UPDATE_ACCOMMODATION_FAILURE,
  RESET_ACCOMMODATION_STATUS, SHOW_ALERT, LIKE_ACCOMMODATION, LIKE_ACCOMMODATION_ERROR, HIGH_RATED_SUCCESS, HIGH_RATED_FAILURE, SEARCH_ACCOMMODATIONS,
  SEARCH_ACCOMMODATIONS_ERROR, CLEAR_SEARCH_ERROR, DEACTIVATED_ACCOMMODATION_SUCCESS, DEACTIVATED_ACCOMMODATION_ERROR, ACTIVATE_ACCOMMODATION_ERROR,
  ACTIVATE_ACCOMMODATION_SUCCESS, DELETE_ACCOMMODATION_SUCCESS, DELETE_ACCOMMODATION_FAIL,
} from './types';
import backendCall from '../helpers/backendCall';
import { getToken, storeUserId } from '../helpers/authHelper';

const accommodationType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${token}`,
};

const activationHeaders = {
  'Content-Type': 'application/json',
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
      dispatch(
        accommodationType(CLEAR_SEARCH_ERROR),
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
      storeUserId(response.data.ownerUser.id);
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

export const likeUnlikeAccommodation = (slug, action) => async (dispatch) => {
  try {
    const res = await backendCall.post(`/accommodations/${slug}/${action}`, {}, { headers });
    dispatch(accommodationType(LIKE_ACCOMMODATION, res.data));
  } catch (error) {
    dispatch(accommodationType(LIKE_ACCOMMODATION_ERROR, error.response));
  }
};

export const getHighRatedAccommodation = () => (dispatch) => backendCall.get('/accommodations/ratings/top-rated', { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      accommodationType(HIGH_RATED_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      accommodationType(HIGH_RATED_FAILURE, error.response.data),
    );
  });

export const accommodationSearch = (params) => (dispatch) => backendCall.get(`/accommodations/search${params}`, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      accommodationType(SEARCH_ACCOMMODATIONS, response),
    );
    dispatch(accommodationType(CLEAR_SEARCH_ERROR));
  }).catch((error) => {
    dispatch(
      accommodationType(SEARCH_ACCOMMODATIONS_ERROR, error.response.data),
    );
  });

export const deleteAccommodation = (id) => (dispatch) => backendCall.delete(`/accommodations/${id}/delete`, { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      accommodationType(DELETE_ACCOMMODATION_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      accommodationType(DELETE_ACCOMMODATION_FAIL, error.response.data),
    );
  });

export const getDeactivatedAccommodation = () => (dispatch) => backendCall.get('/accommodations/admin/deactivated', { headers })
  .then((res) => {
    const response = res.data;
    dispatch(
      accommodationType(DEACTIVATED_ACCOMMODATION_SUCCESS, response),
    );
  }).catch((error) => {
    dispatch(
      accommodationType(DEACTIVATED_ACCOMMODATION_ERROR, error.response.data),
    );
  });

export const activateAccommodation = (slug, reasons) => (dispatch) => backendCall.patch(`/accommodations/activate/${slug}`, { reasons }, { headers: activationHeaders })
  .then((res) => {
    const response = res.data;
    dispatch(
      accommodationType(ACTIVATE_ACCOMMODATION_SUCCESS, response),
    );
    dispatch(accommodationType(SHOW_ALERT));
    window.location = '/accommodations';
  }).catch((error) => {
    dispatch(
      accommodationType(ACTIVATE_ACCOMMODATION_ERROR, error.response.data),
    );
    dispatch(accommodationType(SHOW_ALERT));
  });
