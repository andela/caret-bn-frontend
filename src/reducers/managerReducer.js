import {
  MANAGER_GET_REQUESTS, MANAGER_GET_REQUESTS_ERROR, MANAGER_SEARCH_REQUESTS_ERROR, MANAGER_SEARCH_REQUESTS,
} from '../actions/types';

const initialState = {
  data: null,
  filteredRequests: null,
  dataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MANAGER_GET_REQUESTS:
      return {
        ...state,
        data: action.payload.data,
        status: 'success',
      };
    case MANAGER_GET_REQUESTS_ERROR:
      return {
        ...state,
        dataError: action.payload,
        status: 'error',
      };
    case MANAGER_SEARCH_REQUESTS:
      return {
        ...state,
        filteredRequests: action.payload.data,
        status: 'success',
      };
    case MANAGER_SEARCH_REQUESTS_ERROR:
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
