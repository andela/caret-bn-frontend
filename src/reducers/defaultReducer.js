/* eslint-disable default-case */
import { DEFAULT_ACTION } from '../actions/types';

const initialState = {
  text: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_ACTION:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
