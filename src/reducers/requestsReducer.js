import {
  GET_REQUESTS_SUCCESS, GET_REQUESTS_FAIL, SINGLE_REQUEST_SUCCESS, SINGLE_REQUEST_FAIL, EDIT_REQUEST_SUCCESS, EDIT_REQUEST_FAIL,
  GET_STATS_SUCCESS, GET_STATS_ERROR,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  singleData: null,
  editData: null,
  editError: null,
  statsData: null,
  statsError: null,
  statsStatus: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        dataError: null,
        statsStatus: null,
      };
    case GET_REQUESTS_FAIL:
      return {
        ...state,
        dataError: action.payload,
        data: null,
        statsStatus: null,
      };
    case SINGLE_REQUEST_SUCCESS:
      return {
        ...state,
        singleData: action.payload.data,
        dataError: null,
        statsStatus: null,
      };
    case SINGLE_REQUEST_FAIL:
      return {
        ...state,
        dataError: action.payload,
        singleData: null,
        statsStatus: null,
      };
    case EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        editData: action.payload,
        editError: null,
        statsStatus: null,
      };
    case EDIT_REQUEST_FAIL:
      return {
        ...state,
        editError: action.payload,
        editData: null,
        statsStatus: null,
      };
    case GET_STATS_SUCCESS:
      return {
        ...state,
        statsData: action.payload,
        statsError: null,
        statsStatus: 'success',
      };
    case GET_STATS_ERROR:
      return {
        ...state,
        statsError: action.payload,
        statsData: null,
        statsStatus: 'error',
      };
    default:
      return {
        ...state,
        statsStatus: null,
      };
  }
};
