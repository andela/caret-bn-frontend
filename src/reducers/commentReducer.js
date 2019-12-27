import {
  SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, GET_COMMENTS_FAIL, SET_COMMENT_DELETE,
} from '../actions/types';

const initialState = {
  commentData: null,
  commentError: null,
  data: null,
  dataError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENT_SUCCESS:
      return {
        ...state,
        commentData: action.payload,
        commentError: null,
        status: 'success',
      };
    case SET_COMMENT_ERROR:
      return {
        ...state,
        commentData: null,
        commentError: action.payload,
        status: 'error',
      };
    case GET_COMMENTS:
      return {
        ...state,
        data: action.payload,
        status: 'success',
      };
    case GET_COMMENTS_FAIL:
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
