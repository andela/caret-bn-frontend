import { PRIVATE_CHAT_HISTORY, PRIVATE_CHAT_HISTORY_ERROR } from '../actions/types';

const initialState = {
  chatMessage: {},
  chatError: {},
};


export default (state = initialState, action) => {
  switch (action.type) {
    case PRIVATE_CHAT_HISTORY:
      return {
        ...state,
        chatMessage: action.payload.data,
      };
    case PRIVATE_CHAT_HISTORY_ERROR:
      return {
        ...state,
        chatError: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
