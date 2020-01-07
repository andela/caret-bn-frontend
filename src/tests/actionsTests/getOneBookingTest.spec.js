import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { GET_ONE_BOOKING, GET_ONE_BOOKING_ERROR} from '../../actions/types';
import { getOneBooking } from '../../actions/bookingActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Booking Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger GET_ONE_BOOKING_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Booking Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Booking Found!",
      },
      type: GET_ONE_BOOKING_ERROR
    }];
    store = mockStore({});
    await store.dispatch(getOneBooking())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger GET_ONE_BOOKING', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "Booking Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Booking Found!",
      },
      type: GET_ONE_BOOKING
    }];
    store = mockStore({});
    await store.dispatch(getOneBooking())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
