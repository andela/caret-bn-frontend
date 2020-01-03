import moxios from 'moxios';
import { getBookings, BookAccommodation, getPendingBookings, approveBooking, rejectBooking } from '../../actions/bookingActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

const bookings = [
  {
    id: 1,
    name: 'Zinizir'
  },
  {
    id: 1,
    name: 'Zodethsa'
  },
  {
    id: 1,
    name: 'Pa Kamaba'
  },
  {
    id: 1,
    name: 'Stereo'
  }

];
const BookedData = {
  checkInDate: '2019-12-21',
  checkOutDate: '2020-01-01',
  accomodationId: 6,
  roomsNumber: 1

}

describe('Booking Actions Test Suite', () => {

  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should return booking data', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: bookings
      });
    });

    const expectedState = {
      data: bookings,
      approvalStatus: null,
      dataError: null,
      pending: null,
      booked: null,
      bookedError: null,
      status: 'success'
    };

    const store = testStore();
    return store.dispatch(getBookings()).then(() => {
      const state = store.getState();
      expect(state.bookings).toEqual(expectedState);
      done();
    });
  });

  it('Should return no booking data', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'no bookings found',
          data: []
        }
      });
    });
    const store = testStore();
    return store.dispatch(getBookings()).then(() => {
      const state = store.getState();
      expect(state.bookings.status).toEqual('error');
      done();
    });
  });

  it('Should return book accommodation', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: null
      });
    });

    const expectedState = {
      data: bookings,
      dataError: null,
      booked: null,
      bookedError: null,
      status: 'success'
    };

    const store = testStore();
    return store.dispatch(BookAccommodation()).then(() => {
      const state = store.getState();
      expect(state.bookings.booked).toEqual(null);
      done();
    });
  });

  it('Should return pending bookings', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'your bookings',
          data: [
            {
              id: 1,
              name: 'Booking demo'
            }
          ]
        }
      });
    });
    const store = testStore();
    return store.dispatch(getPendingBookings()).then(() => {
      const state = store.getState();
      expect(state.bookings.status).toEqual('success');
      done();

    });
  });

  it('Should retrun fail when no bookings are found', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'No bookings',
          data: [
          ]
        }
      });
    });
    const store = testStore();
    return store.dispatch(getPendingBookings()).then(() => {
      const state = store.getState();
      expect(state.bookings.status).toEqual('fail');
      done();
    });
  })

  it('Should approve booking successfully', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Booking approved successfully'
        }
      });
    });
    const store = testStore();
    return store.dispatch(approveBooking()).then(() => {
      const state = store.getState();
      expect(state.bookings.status).toEqual('');
      done();
    });
  })

  it('Should not approve booking successfully', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'Cannot approve booking'
        }
      });
    });
    const store = testStore();
    return store.dispatch(approveBooking()).then(() => {
      const state = store.getState();
      expect(state.bookings.dataError.data.message).toEqual('Cannot approve booking');
      done();
    });
  })

  it('Should display error when cannot approve booking', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'Cannot approve booking'
        }
      });
    });
    const store = testStore();
    return store.dispatch(approveBooking()).then(() => {
      const state = store.getState();
      expect(state.bookings.dataError.data.message).toEqual('Cannot approve booking');
      done();
    });
  })

  it('Should reject booking successfully', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Booking rejected successfully'
        }
      });
    });
    const store = testStore();
    return store.dispatch(rejectBooking(1)).then(() => {
      const state = store.getState();
      expect(state.bookings.data).toEqual(null);
      done();
    });
  });

  it('Should not reject booking successfully', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          message: 'No permissions'
        }
      });
    });
    const store = testStore();
    return store.dispatch(rejectBooking(1)).then(() => {
      const state = store.getState();
      expect(state.bookings.data).toEqual(null);
      done();
    });
  });

});
