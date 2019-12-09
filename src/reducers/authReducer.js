import { SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        dataError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
