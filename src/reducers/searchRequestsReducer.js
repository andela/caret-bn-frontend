import { SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL } from '../actions/types';

const initialState = {
  searchData: null,
  searchDataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUESTS_SUCCESS:
      return {
        ...state,
        searchData: action.payload.data,
        searchDataError: null,
        status: 'success',
      };
    case SEARCH_REQUESTS_FAIL:
      return {
        ...state,
        searchData: null,
        searchDataError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
        status: '',
      };
  }
};
