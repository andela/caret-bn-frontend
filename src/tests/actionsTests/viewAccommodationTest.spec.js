import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE, SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE,
} from '../../actions/types';
import { GetAllAccommodation, GetSingleAccommodation } from '../../actions/accommodationActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Accommodations Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger ALL_ACCOMMODATION_FAILURE,', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: "Invalid token please sign again",
        },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Invalid token please sign again",
      },
      type: ALL_ACCOMMODATION_FAILURE
    }];
    store = mockStore({});
    await store.dispatch(GetAllAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger SINGLE_ACCOMMODATION_FAILURE', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "Accommodation caret-hotelefd does not exist",
        },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Accommodation caret-hotelefd does not exist",
      },
      type: SINGLE_ACCOMMODATION_FAILURE
    }];
    store = mockStore({});
    await store.dispatch(GetSingleAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger ALL_ACCOMMODATION_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Accommodation facilities are retrieved successfully!',
          data: {
            
          }
        },
      });
    });

    const expectedActions = [{
      type: 'ALL_ACCOMMODATION_SUCCESS',
      payload:
      {
        message: 'Accommodation facilities are retrieved successfully!',
        data: {}
      }
    },
    { type: 'CLEAR_SEARCH_ERROR', payload: undefined }];
    store = mockStore({});
    await store.dispatch(GetAllAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger SINGLE_ACCOMMODATION_SUCCESS', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Accommodation retrieved successfully!',
          data: {
            ownerUser:{
              id: 2
            }
          }
        },
      });
    
    });

    const expectedActions = [{
      payload: {
        message: 'Accommodation retrieved successfully!',
        data: {
          ownerUser:{
            id: 2
          }
        }
      },
      type: SINGLE_ACCOMMODATION_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(GetSingleAccommodation())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
        done();
      });
  });
});
