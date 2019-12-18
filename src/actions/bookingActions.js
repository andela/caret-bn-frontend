import {
  GET_BOOKINGS, GET_BOOKINGS_ERROR, BOOK_SUCCESS, BOOK_FAILURE,SHOW_ALERT
} from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const bookingsType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const getBookings = () => (dispatch) => backendCall.get('/accommodations/bookings', { headers }).then((response) => {
  dispatch(bookingsType(GET_BOOKINGS, response.data));
}).catch((error) => {
  dispatch(bookingsType(GET_BOOKINGS_ERROR, error.response));
});

export const BookAccommodation = (checkInDate, checkOutDate, accomodationId, roomsNumber) => (dispatch) => {
  return backendCall.patch('/accommodations/book', { checkInDate, checkOutDate, roomsNumber, accomodationId}, { headers })
    .then((res) => {
      const response = res.data;
      dispatch(
        bookingsType(BOOK_SUCCESS, response),
      );
      dispatch(bookingsType(SHOW_ALERT));
    }).catch((error) => {
      dispatch(
        bookingsType(BOOK_FAILURE, error.response.data),
      );
      dispatch(bookingsType(SHOW_ALERT));
    });
};
