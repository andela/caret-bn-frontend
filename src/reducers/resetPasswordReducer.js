/* eslint-disable default-case */
import { RESET_PASSWORD_REQUEST_SUCESS, RESET_PASSWORD_REQUEST_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
} from '../actions/types';

const initialState = {
  pass: {},
  passwordError: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST_SUCESS:
      return {
        ...state,
        pass: action.payload,
      };
    case RESET_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        passwordError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        pass: action.payload,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        passwordError: action.payload,
      };
    default:
      return {
        state,
      };
  }
};
