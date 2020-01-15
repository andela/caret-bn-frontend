import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { SIGNUP_SUCCESS, SIGNUP_FAIL, SHOW_ALERT } from '../../actions/types';
import { signupAction } from '../../actions/authActions';
import backendCall from '../../helpers/backendCall';
import { Done } from '@material-ui/icons';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userData = {
  email: 'johndoe@gmail.com',
  username: 'johndoe',
  password: 'Pa$5w0rd',
  confirmPassword: 'Pa$5w0rd',
}

describe('Signup Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should run trigger fail', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          message: 'any message',
          error: ["username required"],
        },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'any message',
        error: ["username required"],
      },
      type: SIGNUP_FAIL
    },
    {
      payload: undefined,
      type: SHOW_ALERT,
    }];
    store = mockStore({});
    await store.dispatch(signupAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
        done();
      });
  });

  xit('Should run trigger success', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          message: 'any message',
          data: userData
        },
      });
    });

    const expectedActions = [{
      payload: {
        message: 'any message',
        data: userData
      },
      type: SIGNUP_SUCCESS
    }];
    store = mockStore({});
    await store.dispatch(signupAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
        done();
      });
  });
});
