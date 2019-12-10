import { GET_LOCATIONS, GET_LOCATIONS_ERROR } from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
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
    default:
      return {
        ...state,
      };
  }
};
