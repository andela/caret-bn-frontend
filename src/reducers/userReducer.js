import {
  GET_USERS, GET_USERS_ERROR, GET_SPECIFIC_USER, GET_SPECIFIC_USER_ERROR,
} from '../actions/types';

const initialState = {
  allUserData: null,
  allUserError: null,
  userData: null,
  userError: null,
  status: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        allUserData: payload,
        status: 'Success',
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        allUserError: payload,
        status: 'Failure',
      };
    case GET_SPECIFIC_USER:
      return {
        ...state,
        userData: payload,
        status: 'Success',
      };
    case GET_SPECIFIC_USER_ERROR:
      return {
        ...state,
        userError: payload,
        status: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
