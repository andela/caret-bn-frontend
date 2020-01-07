import { CHAT_HISTORY, CHAT_HISTORY_ERROR } from '../actions/types';

const initialState = {
  chatHistory: null,
  chatHistoryError: null,
  status: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHAT_HISTORY:
      return {
        ...state,
        chatHistory: payload,
        status: 'success',
      };
    case CHAT_HISTORY_ERROR:
      return {
        ...state,
        chatHistoryError: payload,
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
