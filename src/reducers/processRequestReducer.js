import { PROCESS_REQUEST_SUCCESS, PROCESS_REQUEST_ERROR } from '../actions/types';

const initialState = {
  processData: null,
  processError: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_REQUEST_SUCCESS:
      return {
        ...state,
        processData: action.payload,
        processError: null,
        status: 'success',
      };
    case PROCESS_REQUEST_ERROR:
      return {
        ...state,
        processData: null,
        processError: action.payload,
        status: 'error',
      };
    default:
      return {
        ...state,
        status: '',
      };
  }
};
