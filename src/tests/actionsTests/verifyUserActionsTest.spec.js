import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { VERIFY_SUCCESS, VERIFY_ERROR } from '../../actions/types';
import { VerifyUsers } from '../../actions/authActions'
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token =  'ksjfksdkfhkhf';

describe('User Verify Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should run trigger fail', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'Malformed Token',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Malformed Token',
    },
      type: VERIFY_ERROR
    }];
    store = mockStore({});
    await store.dispatch(VerifyUsers())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should run trigger success', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'any message',
          data: token
      },
      });
    });

    const expectedActions = [{
      payload: {
          message: 'any message',
          data: token
      },
      type: VERIFY_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(VerifyUsers())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });
});