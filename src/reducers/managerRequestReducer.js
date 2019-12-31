import {
  MANAGER_GET_REQUESTS_SUCCESS, MANAGER_GET_REQUESTS_FAIL,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MANAGER_GET_REQUESTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
      };
    case MANAGER_GET_REQUESTS_FAIL:
      return {
        ...state,
        dataError: action.payload,
        data: null,
      };
    default:
      return {
        ...state,
      };
  }
};
