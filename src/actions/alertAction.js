import { HIDE_ALERT } from './types';

export const hideAlert = () => async (dispatch) => {
  dispatch({ type: HIDE_ALERT });
};
