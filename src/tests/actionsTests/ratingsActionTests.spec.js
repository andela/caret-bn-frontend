import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { RATE_ACCOMMODATION, RATE_ACCOMMODATION_ERROR } from '../../actions/types';
import { rateAccommodation } from '../../actions/ratingsActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Profile Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should dispatch rate accommodation', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "successfully rated accommodation",
        },
      });
    });

    const expectedActions = [{
      type: 'RATE_ACCOMMODATION',
      payload: { message: 'successfully rated accommodation' }
    },
    { type: 'SHOW_ALERT', payload: undefined }];
    store = mockStore({});
    await store.dispatch(rateAccommodation({}, jest.fn()))
      .then(async () => {
        const calledActions = store.getActions();
        console.log(calledActions)
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should fail', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          data: {
            message: "Failed to dispatch",
          }
        },
      });
    });

    store = mockStore({});
    await store.dispatch(rateAccommodation({}, jest.fn()))
      .then(async () => {
        const calledActions = store.getActions();
        console.log(calledActions);
        expect(calledActions[0].type).toEqual(RATE_ACCOMMODATION_ERROR);
      });
  });
});
