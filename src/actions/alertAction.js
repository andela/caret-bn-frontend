import { HIDE_ALERT } from './types';

export const hideAlert = () => async (dispatch) => {
  console.log('got called!');
  dispatch({ type: HIDE_ALERT });
};
