import { ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE } from './types';
import backendCall from '../helpers/backendCall';
import authHelper from '../helpers/authHelper';

const { getToken } = authHelper;

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
