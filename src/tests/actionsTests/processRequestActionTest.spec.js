import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { PROCESS_REQUEST_SUCCESS, PROCESS_REQUEST_ERROR } from '../../actions/types';
import { processRequestAction } from '../../actions/requestsActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Process Requests Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger PROCESS_REQUEST_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: "Request Already Approved!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Request Already Approved!",
      },
      type: PROCESS_REQUEST_ERROR
    }];
    store = mockStore({});
    await store.dispatch(processRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger PROCESS_REQUEST_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Request Successfully Approved!',
          data: {}
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Request Successfully Approved!',
        data: {}
      },
      type: PROCESS_REQUEST_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(processRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });
});
