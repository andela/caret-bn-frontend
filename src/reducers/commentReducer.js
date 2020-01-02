import {
  SET_COMMENT_SUCCESS, SET_COMMENT_ERROR, GET_COMMENTS, GET_COMMENTS_FAIL, COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_ERROR, COMMENT_EDIT_ERROR, COMMENT_EDIT_SUCCESS,
} from '../actions/types';

const initialState = {
  commentData: null,
  commentError: null,
  data: null,
  dataError: null,
  deleteData: null,
  deleteError: null,
  editData: null,
  editError: null,
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
    case COMMENT_DELETE_SUCCESS:
      return {
        ...state,
        deleteData: action.payload,
        status: 'success',
      };
    case COMMENT_DELETE_ERROR:
      return {
        ...state,
        deleteError: action.payload,
        status: 'error',
      };

    case COMMENT_EDIT_SUCCESS:
      return {
        ...state,
        editData: action.payload,
        status: 'success',
      };
    case COMMENT_EDIT_ERROR:
      return {
        ...state,
        editError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
      };
  }
};
