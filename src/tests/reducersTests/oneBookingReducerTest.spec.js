import bookingsReducer from '../../reducers/bookingsReducer';
import { GET_ONE_BOOKING, GET_ONE_BOOKING_ERROR } from '../../actions/types';

describe('One Booking Reducer Test Suite', () => {
  it('Should return default state', () => {
    const newState = bookingsReducer(undefined, {});
    expect(newState).toEqual({
      "data": null,
      "dataError": null,
      "booked": null,
      "bookedError": null,
      "oneBookingData": null,
      "oneBookingError": null,
      "status": '',
      "approvalStatus": null,
      "pending": null,
    });
  });

  it('Should return GET_ONE_BOOKING', () => {
    const action = {
      type: GET_ONE_BOOKING,
      payload: {
        status: 200,
        data: {
          message: 'Got Booking...'
        }
      }
    }
    const returnedSate = bookingsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "data": null,
      "dataError": null,
      "booked": null,
      "bookedError": null,
      "oneBookingData": action.payload,
      "oneBookingError": null,
      "status": 'success',
      "approvalStatus": null,
      "pending": null,
    })
  });

  it('Should return GET_ONE_BOOKING_ERROR', () => {
    const action = {
      type: GET_ONE_BOOKING_ERROR,
      payload: {
        status: 404,
        data: {
          message: 'No Booking!!!'
        }
      }
    }
    const returnedSate = bookingsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "data": null,
      "dataError": null,
      "booked": null,
      "bookedError": null,
      "oneBookingData": null,
      "oneBookingError": action.payload,
      "status": 'error',
      "approvalStatus": null,
      "pending": null,
    });
  });
});