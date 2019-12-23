import {
  GET_BOOKINGS, GET_BOOKINGS_ERROR, GET_PENDING_BOOKINGS, GET_PENDING_BOOKINGS_ERROR, APPROVE_BOOKING, APPROVE_BOOKING_ERROR, REJECT_BOOKING, REJECT_BOOKING_ERROR, SHOW_ALERT,
} from './types';
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


export const getPendingBookings = () => (dispatch) => backendCall.get('/accommodations/bookings/search?status=pending', { headers }).then((response) => {
  dispatch(bookingsType(GET_PENDING_BOOKINGS, response.data));
}).catch((error) => {
  console.log(error);
  dispatch(bookingsType(GET_PENDING_BOOKINGS_ERROR, error));
});

export const approveBooking = (id) => (dispatch) => backendCall.patch(`/accommodations/bookings/approve/${id}`, {}, { headers }).then((response) => {
  dispatch(bookingsType(APPROVE_BOOKING, response.data));
  dispatch(bookingsType(SHOW_ALERT));
}).catch((error) => {
  console.log(error);
  dispatch(bookingsType(APPROVE_BOOKING_ERROR, error.response));
  dispatch(bookingsType(SHOW_ALERT));
});

export const rejectBooking = (id) => (dispatch) => backendCall.patch(`/accommodations/bookings/reject/${id}`, {}, { headers }).then((response) => {
  dispatch(bookingsType(REJECT_BOOKING, response.data));
  dispatch(bookingsType(SHOW_ALERT));
}).catch((error) => {
  console.log(error);
  dispatch(bookingsType(REJECT_BOOKING_ERROR, error.response));
  dispatch(bookingsType(SHOW_ALERT));
});
