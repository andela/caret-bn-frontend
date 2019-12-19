import {
  SHOW_ALERT, HIDE_ALERT,
} from '../actions/types';

const initialState = {
  isShown: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case SHOW_ALERT:
      return {
        ...state,
        isShown: true,
      };
    case HIDE_ALERT:
      return {
        ...state,
        isShown: false,
      };
    default:
      return {
        ...state,
      };
  }
};
