import { SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL } from '../actions/types';

const initialState = {
  searchData: null,
  searchDataError: null,
  status: '',
};

export default (state = initialState, action) => {
  let reversedData;
  switch (action.type) {
    case SEARCH_REQUESTS_SUCCESS:
      reversedData = action.payload.data;
      return {
        ...state,
        searchData: reversedData,
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
