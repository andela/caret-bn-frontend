import moxios from 'moxios';
import { getBookmarks, bookmarkAccommodation } from '../../actions/bookmarkActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

describe('Bookmark Actions Test Suites', () => {
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
        response: {
          message: 'successfully bookmarked accommodation',
          data: []
        }
      });
    });

    const expectedState = {
      data:
        { message: 'successfully bookmarked accommodation', data: [] },
      dataError: null,
      status: 'success',
      bookmarkStatus: ''
    };

    const store = testStore();
    return store.dispatch(getBookmarks()).then(() => {
      const state = store.getState();
      expect(state.bookmarks).toEqual(expectedState);
      done();
    });
  });


  it('Should return error on get bookmarks', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'unable to bookmark',
          data: []
        }
      });
    });

    const expectedState = {
      data:
        { message: 'successfully bookmarked accommodation', data: [] },
      dataError: null,
      status: 'success',
      bookmarkStatus: ''
    };

    const store = testStore();
    return store.dispatch(getBookmarks()).then(() => {
      const state = store.getState();
      expect(state.bookmarks.status).toEqual('error');
      done();
    });
  });

  it('Should add bookmark', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'Added bookmark successfully',
          data: []
        }
      });
    });

    const store = testStore();
    return store.dispatch(bookmarkAccommodation()).then(() => {
      const state = store.getState();
      expect(state.bookmarks.bookmarkStatus).toEqual('success');
      done();
    });
  });

  it('Should add bookmark', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          message: 'unable to creat bookmark',
          data: []
        }
      });
    });

    const store = testStore();
    return store.dispatch(bookmarkAccommodation()).then(() => {
      const state = store.getState();
      expect(state.bookmarks.bookmarkStatus).toEqual('error');
      done();
    });
  });
});
