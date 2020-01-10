import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, GET_COMMENTS_FAIL, COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_ERROR, COMMENT_EDIT_ERROR, COMMENT_EDIT_SUCCESS, } from '../../actions/types';
import {  setComment, getComment, editComment, deleteComment } from '../../actions/commentAction';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userData = {
    comment: 'hello',
  }

describe('Comments Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should trigger SET_COMMENT_ERROR', async (done) => {
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
      type: SET_COMMENT_ERROR
    }];
    store = mockStore({});
    await store.dispatch(setComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
        done();
      });
  });

  it('Should run trigger SET_COMMENT_SUCCESS', async () => {
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
      type: SET_COMMENT_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(setComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

it('Should trigger GET_COMMENTS', async () => {
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
      type: GET_COMMENTS
    }];
    store = mockStore({});
    await store.dispatch(getComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger COMMENT_DELETE_SUCCESS', async () => {
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
      type: COMMENT_DELETE_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(deleteComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger COMMENT_EDIT_SUCCESS', async () => {
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
      type: COMMENT_EDIT_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(editComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger GET_COMMENTS_FAIL,', async () => {
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
      type: GET_COMMENTS_FAIL
    }];
    store = mockStore({});
    await store.dispatch(getComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger COMMENT_DELETE_ERROR,', async () => {
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
      type: COMMENT_DELETE_ERROR
    }];
    store = mockStore({});
    await store.dispatch(deleteComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('Should trigger COMMENT_EDIT_ERROR,', async () => {
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
      type: COMMENT_EDIT_ERROR
    }];
    store = mockStore({});
    await store.dispatch(editComment())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
