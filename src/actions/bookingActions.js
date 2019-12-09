import { GET_BOOKINGS, GET_BOOKINGS_ERROR } from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const token = getToken();

const bookingsType = (type, payload) => ({
  type,
  payload,
});

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getBookings = () => (dispatch) => backendCall.get('/accommodations/bookings', { headers }).then((response) => {
  dispatch(bookingsType(GET_BOOKINGS, response.data));
}).catch((error) => {
  dispatch(bookingsType(GET_BOOKINGS_ERROR, error.response));
});
