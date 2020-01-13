import {
  GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL, EDIT_REQUEST_SUCCESS, EDIT_REQUEST_FAIL,
  GET_STATS_SUCCESS, GET_STATS_ERROR, SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  singleData: null,
  editData: null,
  editError: null,
  statsData: null,
  statsError: null,
  // statsStatus: null,
  searchData: null,
  searchDataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
        status: 'all-success',
      };
    case GET_REQUESTS_FAIL:
      return {
        ...state,
        dataError: action.payload,
        data: null,
        status: 'all-error',
      };
    case SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        singleData: action.payload.data,
        dataError: null,
        status: 'one-success',
      };
    case SINGLE_REQUEST_FAIL:
      return {
        ...state,
        dataError: action.payload,
        singleData: null,
        status: 'one-error',
      };
    case EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        editData: action.payload,
        editError: null,
        status: 'edit-success',
      };
    case EDIT_REQUEST_FAIL:
      return {
        ...state,
        editError: action.payload,
        editData: null,
        status: 'edit-error',
      };
    case GET_STATS_SUCCESS:
      return {
        ...state,
        statsData: action.payload,
        statsError: null,
        status: 'stats-success',
      };
    case GET_STATS_ERROR:
      return {
        ...state,
        statsError: action.payload,
        statsData: null,
        status: 'stats-error',
      };
    case SEARCH_REQUESTS_SUCCESS:
      return {
        ...state,
        searchData: action.payload.data,
        searchDataError: null,
        status: 'search-success',
      };
    case SEARCH_REQUESTS_FAIL:
      return {
        ...state,
        searchData: null,
        searchDataError: action.payload,
        status: 'search-error',
      };
    default:
      return {
        ...state,
      };
  }
};
