import moxios from 'moxios';
import { getChatHistory } from '../../actions/chatActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

describe('Chat Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(backendCall);
  });

  afterEach(() => {
    moxios.uninstall(backendCall);
  });

  it('Should return chat data', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Chats retrieved successfully',
          data: []
        }
      });
    });

    const expectedState = {
        chatHistory: { message: "Chats retrieved successfully", data: [] },
          chatHistoryError: null,
          status: 'success',
      };
  
      const store = testStore();
      return store.dispatch(getChatHistory()).then(() => {
      const state = store.getState();
      expect(state.chat).toEqual(expectedState);
      done();
    });
  });
});
