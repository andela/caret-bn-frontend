import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { HIGH_RATED_SUCCESS, HIGH_RATED_FAILURE,}
from '../../actions/types';
import { getHighRatedAccommodation} from '../../actions/accommodationActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('high rated Accommodations Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger HIGH_RATED_FAILURE', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: "Invalid token please sign again",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Invalid token please sign again",
      },
      type: HIGH_RATED_FAILURE
    }];
    store = mockStore({});
    await store.dispatch(getHighRatedAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger HIGH_RATED_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "The top 5 highest rated accommodations are:",
          data: {}
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "The top 5 highest rated accommodations are:",
        data: {}
      },
      type: HIGH_RATED_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(getHighRatedAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });
});
