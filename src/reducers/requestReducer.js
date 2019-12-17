import {
  MAKE_REQUEST_SUCCESS, MAKE_REQUEST_FAILURE,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    case MAKE_REQUEST_FAILURE:
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
