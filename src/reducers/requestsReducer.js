import {
  GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL, EDIT_REQUEST_SUCCESS, EDIT_REQUEST_FAIL,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  singleData: null,
  editData: null,
  editError: null,
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
        singleData: action.payload.data,
        dataError: null,
      };
    case SINGLE_REQUEST_FAIL:
      return {
        ...state,
        dataError: action.payload,
        singleData: null,
      };
    case EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        editData: action.payload,
        editError: null,
      };
    case EDIT_REQUEST_FAIL:
      return {
        ...state,
        editError: action.payload,
        editData: null,
      };
    default:
      return {
        ...state,
      };
  }
};
