import {
  ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE,
  ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE,
  SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE,
  UPDATE_ACCOMMODATION_SUCCESS, UPDATE_ACCOMMODATION_FAILURE,
  RESET_ACCOMMODATION_STATUS, LIKE_ACCOMMODATION, LIKE_ACCOMMODATION_ERROR,
  HIGH_RATED_SUCCESS, HIGH_RATED_FAILURE,
  SEARCH_ACCOMMODATIONS_ERROR, SEARCH_ACCOMMODATIONS, CLEAR_SEARCH_ERROR,
} from '../actions/types';

const initialState = {
  accommodationData: null,
  accommodationError: null,
  status: '',
  getAccommodation: [],
  getAccommodationError: {},
  singleAccommodation: {},
  singleAccommodationError: {},
  updateSuccess: null,
  updateError: null,
  updateStatus: null,
  like: null,
  dislike: null,
  likeStatus: '',
  highRated: null,
  hihRatedError: null,
  searchResults: null,
  searchError: null,
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

    case UPDATE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        updateSuccess: payload.data,
        updateStatus: 'success',
      };
    case UPDATE_ACCOMMODATION_FAILURE:
      return {
        ...state,
        updateError: payload,
        updateStatus: 'fail',
      };
    case RESET_ACCOMMODATION_STATUS:
      return {
        ...state,
        updateError: payload,
        updateStatus: payload,
      };
    case LIKE_ACCOMMODATION:
      return {
        ...state,
        like: payload,
        dislike: null,
        likeStatus: 'Success',
      };
    case LIKE_ACCOMMODATION_ERROR:
      return {
        ...state,
        dislike: payload,
        like: null,
        likeStatus: 'Failure',
      };
    case HIGH_RATED_SUCCESS:
      return {
        ...state,
        highRated: payload,
      };
    case HIGH_RATED_FAILURE:
      return {
        ...state,
        hihRatedError: payload,
      };
    case SEARCH_ACCOMMODATIONS:
      return {
        ...state,
        searchResults: payload,
        searchError: null,
        status: 'success',
      };
    case SEARCH_ACCOMMODATIONS_ERROR:
      return {
        ...state,
        searchError: payload,
        status: 'error',
        searchResults: null,
      };
    case CLEAR_SEARCH_ERROR: {
      return {
        ...state,
        searchError: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
