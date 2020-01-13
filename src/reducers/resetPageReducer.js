import { RESET_PAGE, RESET_PAGE_FALSE } from '../actions/types';

const initialState = {
  resetState: false,
};

export default (state = initialState, { type }) => {
  switch (type) {
    case RESET_PAGE:
      return {
        ...state,
        resetState: true,
      };
    case RESET_PAGE_FALSE:
      return {
        ...state,
        resetState: false,
      };
    default:
      return {
        ...state,
      };
  }
};
