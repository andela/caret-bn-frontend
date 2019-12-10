import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { RESET_PASSWORD_REQUEST_SUCESS, RESET_PASSWORD_REQUEST_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
} from '../../actions/types';
import { resetPaswordRequest, resetPasword} from '../../actions/authActions';
import backendCall from '../../helpers/backendCall';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userEmail = {
  email: 'caretuser@gmail.com',
}
const userPassword = {
  password: 'Pa$5w0rd',
  confirmPassword: 'Pa$5w0rd',
}

describe('Reset password Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('it Should get fail on forgotpassword', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'any message',
          error: ["email  required"],
      },
      });
    });

    const expectedActions = [{
      payload: {
          message: 'any message',
          error: ["email  required"],
      },
      type: RESET_PASSWORD_REQUEST_FAILURE
    }];
    store = mockStore({});
    await store.dispatch(resetPaswordRequest())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it Should get success on forgotpasword', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'any message',
          data: userEmail
      },
      });
    });

    const expectedActions = [{
      payload: {
          message: 'any message',
          data: userEmail
      },
      type: RESET_PASSWORD_REQUEST_SUCESS
    }];
    store = mockStore({});
    await store.dispatch(resetPaswordRequest())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
 });
 
 it('Should get success', async () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: {
        message: 'any message',
        data: userPassword
    },
    });
  });

  const expectedActions = [{
    payload: {
        message: 'any message',
        data: userPassword
    },
    type: RESET_PASSWORD_SUCCESS
  }];
  store = mockStore({});
  await store.dispatch(resetPasword())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
});
it('Should get fail', async () => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 400,
      response: {
        message: 'any message',
        error: ["NewPassword  required"],
    },
    });
  });

  const expectedActions = [{
    payload: {
        message: 'any message',
        error: ["NewPassword  required"],
    },
    type: RESET_PASSWORD_FAILURE
  }];
  store = mockStore({});
  await store.dispatch(resetPasword())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
});
});