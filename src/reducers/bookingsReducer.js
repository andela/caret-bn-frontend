import {
  GET_BOOKINGS, GET_BOOKINGS_ERROR,
  GET_PENDING_BOOKINGS, GET_PENDING_BOOKINGS_ERROR, APPROVE_BOOKING, APPROVE_BOOKING_ERROR, BOOK_SUCCESS, BOOK_FAILURE,
  GET_ONE_BOOKING, GET_ONE_BOOKING_ERROR,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  booked: null,
  bookedError: null,
  status: '',
  pending: null,
  approvalStatus: null,
  oneBookingData: null,
  oneBookingError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    case GET_BOOKINGS_ERROR:
      return {
        ...state,
        dataError: action.payload,
        status: 'error',
      };
    case APPROVE_BOOKING:
      return {
        ...state,
        data: action.payload,
        approvalStatus: 'success',
      };
    case GET_PENDING_BOOKINGS:
      return {
        ...state,
        pending: action.payload,
        status: 'success',
      };
    case APPROVE_BOOKING_ERROR:
      return {
        ...state,
        dataError: action.payload,
        approvalStatus: 'fail',
      };
    case GET_PENDING_BOOKINGS_ERROR:
      return {
        ...state,
        dataError: action.payload,
        status: 'fail',
      };
    case BOOK_SUCCESS:
      return {
        ...state,
        booked: action.payload,
        bookedError: null,
        status: 'success',
      };
    case BOOK_FAILURE:
      return {
        ...state,
        booked: null,
        bookedError: action.payload,
        status: 'error',
      };
    case GET_ONE_BOOKING:
      return {
        ...state,
        oneBookingData: action.payload,
        oneBookingError: null,
        status: 'success',
      };
    case GET_ONE_BOOKING_ERROR:
      return {
        ...state,
        oneBookingData: null,
        oneBookingError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
