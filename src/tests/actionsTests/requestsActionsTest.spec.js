import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL } from '../../actions/types';
import { getRequestsAction, singleRequestAction } from '../../actions/requestsActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signup Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger GET_REQUESTS_FAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Requests Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Requests Found!",
      },
      type: GET_REQUESTS_FAIL
    }];
    store = mockStore({});
    await store.dispatch(getRequestsAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger SINGLE_REQUEST_FAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Request Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Request Found!",
      },
      type: SINGLE_REQUEST_FAIL
    }];
    store = mockStore({});
    await store.dispatch(singleRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger GET_REQUESTS_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Requests Found!',
          data: [],
      },
      });
    });

    const expectedActions = [{
      payload: [],
      type: GET_REQUESTS_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(getRequestsAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });

  it('Should trigger SINGLE_REQUEST_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Request Found!',
          data: {}
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Request Found!',
        data: {}
      },
      type: SINGLE_REQUEST_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(singleRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });
});
