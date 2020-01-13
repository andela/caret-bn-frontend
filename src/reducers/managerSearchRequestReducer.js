import { MANAGER_SEARCH_REQUESTS_SUCCESS, MANAGER_SEARCH_REQUESTS_FAIL } from '../actions/types';

const initialState = {
  managerSearchData: null,
  managerSearchDataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MANAGER_SEARCH_REQUESTS_SUCCESS:
      return {
        ...state,
        managerSearchData: action.payload.data,
        managerSearchDataError: null,
        status: 'success',
      };
    case MANAGER_SEARCH_REQUESTS_FAIL:
      return {
        ...state,
        managerSearchData: null,
        managerSearchDataError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
