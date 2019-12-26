import {
  GET_LOCATIONS, GET_LOCATIONS_ERROR, TOP_DESTINATIONS, TOP_DESTINATIONS_ERROR,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
  topData: null,
  topError: null,
  topStatus: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    case GET_LOCATIONS_ERROR:
      return {
        ...state,
        dataError: action.payload,
        status: 'error',
      };
    case TOP_DESTINATIONS:
      return {
        ...state,
        topData: action.payload,
        topError: null,
        topStatus: 'success',
      };
    case TOP_DESTINATIONS_ERROR:
      return {
        ...state,
        topData: null,
        topError: action.payload,
        topStatus: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
