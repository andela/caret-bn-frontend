import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL, SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL, EDIT_REQUEST_SUCCESS, EDIT_REQUEST_FAIL, GET_STATS_SUCCESS, GET_STATS_ERROR, SHOW_ALERT } from '../../actions/types';
import { getRequestsAction, singleRequestAction, searchRequestAction, getStatsAction } from '../../actions/requestsActions';
import { editRequestAction } from '../../actions/requestActions'
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const itemPending= {
  id: 1,
  reasons: 'Partner Company Meeting',
  departureDate: '2019-11-21',
  returnDate: '2019-11-21',
  type: {
    id: 5,
    name: 'Lagos Office',
  },
  status: {
    id: 1,
    name: 'Pending',
  },
  destinations: [
    {
      id: 1,
      reasons: 'Partner Company Meeting',
      arrivalDate: '2019-11-21',
      departureDate: null,
      location: {
        country: 'Nigeria',
        id: 5,
        name: 'Lagos Office',
      },
    },
  ],
}

describe('Requests Actions Test Suite', () => {
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
  it('Should trigger SEARCH_REQUESTS_SUCCESS', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: "Results",
          data: []
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "Results",
        data: []
      },
      type: SEARCH_REQUESTS_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(searchRequestAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger SEARCH_REQUESTS_FAIL', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          message: "No Requests found",
      },
      });
    });

    const expectedActions = [{
      payload: {
        message: "No Requests found",
      },
      type: SEARCH_REQUESTS_FAIL
    }];
    store = mockStore({});
    await store.dispatch(searchRequestAction())
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

 it('Should trigger SEARCH_REQUESTS_SUCCESS', async () => {
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
    type: SEARCH_REQUESTS_SUCCESS
  }];
  store = mockStore({});
  await store.dispatch(searchRequestAction())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
});


it('Should trigger SEARCH_REQUESTS_FAIL', async () => {
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
    type: SEARCH_REQUESTS_FAIL
  }];
  store = mockStore({});
  await store.dispatch(searchRequestAction())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
});

 it('Should trigger GET_STATS_SUCCESS', async () => {
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
    type: GET_STATS_SUCCESS
  }];
  store = mockStore({});
  await store.dispatch(getStatsAction())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
});

it('Should trigger GET_STATS_ERROR', async () => {
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
    type: GET_STATS_ERROR
  },
  {
    payload: undefined,
    type: SHOW_ALERT,
  }];
  store = mockStore({});
  await store.dispatch(getStatsAction())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
});

});
