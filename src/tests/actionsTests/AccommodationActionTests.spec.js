import moxios from 'moxios';
import { accommodationSearch } from '../../actions/accommodationActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

describe('Booking Actions Test Suite', () => {

  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should Successfully search accommodations', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Your Accommodations',
          data: [
            {
              id: 1
            }
          ]
        }
      });
    });
    const store = testStore();
    return store.dispatch(accommodationSearch()).then(() => {
      const state = store.getState();
      expect(state.accommodation.searchResults.message).toEqual('Your Accommodations');
      done();
    });
  });

  it('Should Successfully search accommodations', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'No Search Results'
        }
      });
    });
    const store = testStore();
    return store.dispatch(accommodationSearch()).then(() => {
      const state = store.getState();
      expect(state.accommodation.searchError.message).toEqual('No Search Results');
      done();
    });
  });


});
