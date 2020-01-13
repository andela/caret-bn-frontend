import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { DEACTIVATED_ACCOMMODATION_SUCCESS, DEACTIVATED_ACCOMMODATION_ERROR, } from '../../actions/types';
import {  setComment, getComment, editComment, deleteComment, getDeactivatedAccommodation } from '../../actions/accommodationActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Deactivated Accommodation Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  xit('Should trigger DEACTIVATED_ACCOMMODATION_ERROR,', async () => {
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
      type: DEACTIVATED_ACCOMMODATION_ERROR,
    }];
    store = mockStore({});
    await store.dispatch(getDeactivatedAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  xit('Should run trigger DEACTIVATED_ACCOMMODATION_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'any message',
        },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'any message',
      },
      type: DEACTIVATED_ACCOMMODATION_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(getDeactivatedAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
