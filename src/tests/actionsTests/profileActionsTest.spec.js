import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL} from '../../actions/types';
import { GetUserProfile, UpdateUserProfile } from '../../actions/profileAction';
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
          message: "No Profile Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Profile Found!",
      },
      type: PROFILE_ERROR
    }];
    store = mockStore({});
    await store.dispatch(GetUserProfile())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger UPDATE_PROFILE_FAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Profile Found!",
      },
      });
    });

    const expectedActions = [ { type: 'UPDATE_PROFILE_FAIL',
    payload:{
     Response : {
       config: {},
       data: {}},
       status: 404,
       statusText: undefined,
       headers: undefined,
       request: [{}],
       code: undefined } } ];
    store = mockStore({});
    await store.dispatch(UpdateUserProfile())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions[0].type).toEqual(expectedActions[0].type);
      });
  });

  it('Should trigger GET_PROFILE', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "No Profile Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Profile Found!",
      },
      type: "GET_PROFILE",
    }];
    store = mockStore({});
    await store.dispatch(GetUserProfile())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger UPDATE_PROFILE_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "No Profile Found!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Profile Found!",
      },
      type: UPDATE_PROFILE_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(UpdateUserProfile())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});