import {
  RATE_ACCOMMODATION, RATE_ACCOMMODATION_ERROR,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RATE_ACCOMMODATION:
      return {
        ...state,
        data: action.payload,
        status: 'success',
        dataError: '',
      };
    case RATE_ACCOMMODATION_ERROR:
      return {
        ...state,
        dataError: action.payload,
        data: '',
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
