import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { GET_ALL_NOTIF_SUCCESS, GET_ALL_NOTIF_ERROR, MARK_ONE_NOTIF_SUCCESS, MARK_ONE_NOTIF_ERROR, MARK_ALL_NOTIF_SUCCESS, MARK_ALL_NOTIF_ERROR, SWITCH_NOTIF_SUCCESS, SWITCH_NOTIF_ERROR } from '../../actions/types';
import { getNotifsAction, markOneNotifAction, markAllNotifAction, switchNotifAction  } from '../../actions/notificationsActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Notifications Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger GET_ALL_NOTIF_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "Your Notifications",
          data: {},
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Your Notifications",
        data: {},
      },
      type: GET_ALL_NOTIF_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(getNotifsAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger GET_ALL_NOTIF_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Notifications!",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Notifications!",
      },
      type: GET_ALL_NOTIF_ERROR
    }];
    store = mockStore({});
    await store.dispatch(getNotifsAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger MARK_ONE_NOTIF_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Marked Successfully!',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Marked Successfully!',
      },
      type: MARK_ONE_NOTIF_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(markOneNotifAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });

  it('Should trigger MARK_ONE_NOTIF_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'Error!',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Error!',
      },
      type: MARK_ONE_NOTIF_ERROR
    }];
    store = mockStore({});
    await store.dispatch(markOneNotifAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });

  it('Should trigger MARK_ALL_NOTIF_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'All Marked Successfully!',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'All Marked Successfully!',
      },
      type: MARK_ALL_NOTIF_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(markAllNotifAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });

  it('Should trigger MARK_ALL_NOTIF_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'Error!',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Error!',
      },
      type: MARK_ALL_NOTIF_ERROR
    }];
    store = mockStore({});
    await store.dispatch(markAllNotifAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });

  it('Should trigger SWITCH_NOTIF_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Switched Successfully!',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Switched Successfully!',
      },
      type: SWITCH_NOTIF_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(switchNotifAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });

  it('Should trigger SWITCH_NOTIF_ERROR', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: 'Error!',
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'Error!',
      },
      type: SWITCH_NOTIF_ERROR
    }];
    store = mockStore({});
    await store.dispatch(switchNotifAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });
});
