import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { MANAGER_GET_REQUESTS_SUCCESS, MANAGER_GET_REQUESTS_FAIL, MANAGER_SEARCH_REQUESTS_SUCCESS, MANAGER_SEARCH_REQUESTS_FAIL, } from '../../actions/types';
import {  getManagerRequestAction, managerSearchRequestAction } from '../../actions/managerRequestAction';
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

  it('Should trigger PROFILE_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Data Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Data Found!",
      },
      type: MANAGER_GET_REQUESTS_FAIL
    }];
    store = mockStore({});
    await store.dispatch(getManagerRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger MANAGER_GET_REQUESTS_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "No Data Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Data Found!",
      },
      type: MANAGER_GET_REQUESTS_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(getManagerRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger MANAGER_SEARCH_REQUESTS_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "No Data Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Data Found!",
      },
      type: MANAGER_SEARCH_REQUESTS_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(managerSearchRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger PROFILE_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Data Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Data Found!",
      },
      type: MANAGER_SEARCH_REQUESTS_FAIL
    }];
    store = mockStore({});
    await store.dispatch(managerSearchRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
