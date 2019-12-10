import {
  GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  singleData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
      };
    case GET_REQUESTS_FAIL:
      return {
        ...state,
        dataError: action.payload,
        data: null,
      };
    case SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        singleData: action.payload,
        dataError: null,
      };
    case SINGLE_REQUEST_FAIL:
      return {
        ...state,
        dataError: action.payload,
        singleData: null,
      };
    default:
      return {
        ...state,
      };
  }
};
