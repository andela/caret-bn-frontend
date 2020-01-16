import {
  GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    case PROFILE_ERROR:
      return {
        ...state,
        dataError: action.payload,
        status: 'error',
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
        dataError: null,
      };
    case UPDATE_PROFILE_FAIL:
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
