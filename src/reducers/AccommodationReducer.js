import { ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE } from '../actions/types';

const initialState = {
  accommodationData: null,
  accommodationError: null,
  status: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ACCOMMODATION_SUCESS:
      return {
        ...state,
        accommodationData: payload,
        status: 'Success',
      };
    case ADD_ACCOMMODATION_FAILURE:
      return {
        ...state,
        accommodationError: payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
