import {
  BOOKMARK_ACCOMMODATION_ERROR, BOOKMARK_ACCOMMODATION, GET_BOOKMARKS, GET_BOOKMARKS_ERROR,
} from '../actions/types';

const initialState = {
  data: null,
  dataError: null,
  status: '',
  bookmarkStatus: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKMARK_ACCOMMODATION:
      return {
        ...state,
        data: action.payload,
        bookmarkStatus: 'success',
      };
    case BOOKMARK_ACCOMMODATION_ERROR:
      return {
        ...state,
        dataError: action.payload,
        bookmarkStatus: 'error',
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
        dataError: null,
      };
    case GET_BOOKMARKS_ERROR:
      return {
        ...state,
        data: null,
        dataError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
