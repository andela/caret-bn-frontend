import moxios from 'moxios';
import { getBookings } from '../../actions/bookingActions';
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

describe('Booking Actions Test Suite', () => {

  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should return booking data', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: bookings
      });
    });

    const expectedState = {
      approvalStatus: null,
      data: bookings,
      dataError: null,
      pending: null,
      status: 'success'
    };

    const store = testStore();
    return store.dispatch(getBookings()).then(() => {
      const state = store.getState();
      expect(state.bookings).toEqual(expectedState);
    });
  });
  it('Should dispatch error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        message: 'Something went wrong'
      });
    });

    const store = testStore();

    return store.dispatch(getBookings()).then(() => {
      const state = store.getState();
      expect(state.bookings.status).toEqual('error');
    });
  });

});
