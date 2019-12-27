import moxios from 'moxios';
import { sendRequest } from '../../actions/requestActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';
import { editRequestAction } from '../../actions/requestActions'

describe('Request Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should return location data', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'Successfully Placed Request',
      });
    });

    const expectedState = {
      data: 'Successfully Placed Request',
      dataError: null,
      status: 'success'
    }

    const store = testStore();
    return store.dispatch(sendRequest()).then(() => {
      const state = store.getState();
      expect(state.request).toEqual(expectedState);
    });
  });


  it('Should dispatch error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        message: 'Something went wrong',
      });
    });

    const store = testStore();

    return store.dispatch(sendRequest()).then(() => {
      const state = store.getState();
      expect(state.request.status).toEqual('error');
    });
  });

  it('Should return location data', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'Request Updated',
      });
    });
  
    const expectedState = {
      data: null,
      dataError: null,
      status: "",
    }
  
    const store = testStore();
    return store.dispatch(editRequestAction()).then(() => {
      const state = store.getState();
      expect(state.request).toEqual(expectedState);
    });
  });

  it('Should update request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'Request Updated',
      });
    });
  
    const expectedState = {
      data: null,
      dataError: null,
      status: "",
    }
  
    const store = testStore();
    return store.dispatch(editRequestAction()).then(() => {
      const state = store.getState();
      expect(state.request).toEqual(expectedState);
    });
  });

  it('Should return update request error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'Invalid token please sign again',
      });
    });
  
    const expectedState = {
      data: null,
      dataError: null,
      status: "",
    }
  
    const store = testStore();
    return store.dispatch(editRequestAction()).then(() => {
      const state = store.getState();
      expect(state.request).toEqual(expectedState);
    });
  });
});
