import {
  ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE, ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE, SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE,
} from '../actions/types';

const initialState = {
  accommodationData: null,
  accommodationError: null,
  status: '',
  getAccommodation: [],
  getAccommodationError: {},
  singleAccommodation: {},
  singleAccommodationError: {},
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
    case ALL_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        getAccommodation: payload.data,
      };
    case ALL_ACCOMMODATION_FAILURE:

      return {
        ...state,
        getAccommodationError: payload,
      };

    case SINGLE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        singleAccommodation: payload.data,
      };
    case SINGLE_ACCOMMODATION_FAILURE:
      return {
        ...state,
        singleAccommodationError: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
