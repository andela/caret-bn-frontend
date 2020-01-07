import {
  GET_BOOKINGS, GET_BOOKINGS_ERROR, GET_PENDING_BOOKINGS, GET_PENDING_BOOKINGS_ERROR,
  APPROVE_BOOKING, APPROVE_BOOKING_ERROR, REJECT_BOOKING, REJECT_BOOKING_ERROR, SHOW_ALERT, BOOK_SUCCESS, BOOK_FAILURE,
  GET_ONE_BOOKING, GET_ONE_BOOKING_ERROR,
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


export const getPendingBookings = () => (dispatch) => backendCall.get('/accommodations/bookings/search?status=pending', { headers }).then((response) => {
  dispatch(bookingsType(GET_PENDING_BOOKINGS, response.data));
}).catch((error) => {
  dispatch(bookingsType(GET_PENDING_BOOKINGS_ERROR, error));
});

export const approveBooking = (id) => (dispatch) => backendCall.patch(`/accommodations/bookings/approve/${id}`, {}, { headers }).then((response) => {
  dispatch(bookingsType(APPROVE_BOOKING, response.data));
  return dispatch(bookingsType(SHOW_ALERT));
}).catch((error) => {
  dispatch(bookingsType(APPROVE_BOOKING_ERROR, error.response));
  return dispatch(bookingsType(SHOW_ALERT));
});

export const rejectBooking = (id) => (dispatch) => backendCall.patch(`/accommodations/bookings/reject/${id}`, {}, { headers }).then((response) => {
  dispatch(bookingsType(REJECT_BOOKING, response.data));
  dispatch(bookingsType(SHOW_ALERT));
}).catch((error) => {
  dispatch(bookingsType(REJECT_BOOKING_ERROR, error.response));
  dispatch(bookingsType(SHOW_ALERT));
});
export const BookAccommodation = (checkInDate, checkOutDate, accomodationId, roomsNumber) => (dispatch) => backendCall.patch('/accommodations/book', {
  checkInDate, checkOutDate, roomsNumber, accomodationId,
}, { headers })
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

export const getOneBooking = (id) => (dispatch) => backendCall.get(`/accommodations/bookings/${id}`, { headers })
  .then((response) => {
    dispatch(bookingsType(GET_ONE_BOOKING, response.data));
  }).catch((error) => {
    dispatch(bookingsType(GET_ONE_BOOKING_ERROR, error.response.data));
  });
