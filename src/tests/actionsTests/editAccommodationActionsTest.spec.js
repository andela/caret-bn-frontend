import moxios from 'moxios';
import { updateAccommodation } from '../../actions/accommodationActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

describe('Request Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should return success when updated', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'Successfully updated accommodation',
      });
    });

    const expectedState = {
      accommodationData: null,
      accommodationError: null,
      getAccommodation: [],
      getAccommodationError: {},
      searchError: null,
      searchResults: null,
      singleAccommodation: {},
      singleAccommodationError: {},
      status: "",
      updateError: null,
      updateStatus: "success",
      updateSuccess: undefined,
      like: null,
      dislike: null,
      likeStatus: '',
      highRated: null,
      hihRatedError: null,
      deleteStatus: null,
      accommodationDeactivatedData: [],
      accommodationDeactivatedError: {},
    }

    const store = testStore();
    return store.dispatch(updateAccommodation({
      name: 'hotel'
    })).then(() => {
      const state = store.getState();
      expect(state.accommodation).toEqual(expectedState);
    });
  });
});
