import bookingsReducer from '../../reducers/bookingsReducer';
import {
  BOOK_FAILURE, BOOK_SUCCESS, APPROVE_BOOKING, APPROVE_BOOKING_ERROR,
  GET_PENDING_BOOKINGS, GET_PENDING_BOOKINGS_ERROR, GET_BOOKINGS, GET_BOOKINGS_ERROR
} from "../../actions/types";

describe('User Bookings Reducer Tests ', () => {
  it('Should return default state for users', () => {
    const inistialState = bookingsReducer(undefined, {});
    expect(inistialState).toEqual({
      "approvalStatus": null,
      "data": null,
      "dataError": null,
      "pending": null,
      "booked": null,
      "bookedError": null,
      "status": '',
    });
  });


  it('Should handle BOOK_FAILURE ', () => {
    const successAction = {
      type: BOOK_FAILURE,
      payload: {
        message: 'Booking Failed'
      }
    }
    const returnedSate = bookingsReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      "approvalStatus": null,
      "data": null,
      "dataError": null,
      "pending": null,
      "booked": null,
      "bookedError": successAction.payload,
      "status": 'error',
    })
  });

  it('Should handle BOOK_SUCCESS ', () => {
    const successAction = {
      type: BOOK_SUCCESS,
      payload: {
        message: 'SUCCESS'
      }
    }
    const returnedSate = bookingsReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      data: null,
      dataError: null,
      booked: { message: 'SUCCESS' },
      bookedError: null,
      status: 'success',
      pending: null,
      approvalStatus: null
    })
  });


  it('Should handle APPROVE', () => {
    const approveAction = {
      type: APPROVE_BOOKING,
      payload: {
        message: 'Booking Failed'
      }
    }
    const returnedSate = bookingsReducer(undefined, approveAction);
    expect(returnedSate).toEqual(
      {
        data: { message: 'Booking Failed' },
        dataError: null,
        booked: null,
        bookedError: null,
        status: '',
        pending: null,
        approvalStatus: 'success'
      })
  });

  it('Should handle APPROVE_BOOKING_FAILURE ', () => {
    const approveErrorAction = {
      type: APPROVE_BOOKING_ERROR,
      payload: {
        message: 'Booking Failed'
      }
    }
    const returnedSate = bookingsReducer(undefined, approveErrorAction);
    expect(returnedSate).toEqual(
      {
        data: null,
        dataError: { message: 'Booking Failed' },
        booked: null,
        bookedError: null,
        status: '',
        pending: null,
        approvalStatus: 'fail'
      }
    )
  });

  it('Should handle GET_PENDING_BOOKINGS ', () => {
    const pendingBookings = {
      type: GET_PENDING_BOOKINGS,
      payload: {
        message: 'Booking Failed'
      }
    }
    const returnedSate = bookingsReducer(undefined, pendingBookings);
    expect(returnedSate).toEqual(
      {
        data: null,
        dataError: null,
        booked: null,
        bookedError: null,
        status: 'success',
        pending: { message: 'Booking Failed' },
        approvalStatus: null
      }
    )
  });

  it('Should handle GET_PENDING_BOOKINGS_ERROR ', () => {
    const pendingBookings = {
      type: GET_PENDING_BOOKINGS_ERROR,
      payload: {
        message: 'Booking Failed'
      }
    }
    const returnedSate = bookingsReducer(undefined, pendingBookings);
    console.log(returnedSate);
    expect(returnedSate).toEqual(
      {
        data: null,
        dataError: { message: 'Booking Failed' },
        booked: null,
        bookedError: null,
        status: 'fail',
        pending: null,
        approvalStatus: null
      }
    )
  });


}); 