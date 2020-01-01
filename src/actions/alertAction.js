import { HIDE_ALERT, SHOW_ALERT } from './types';

export const hideAlert = () => async (dispatch) => {
  dispatch({ type: HIDE_ALERT });
};

export const showAlert = () => async (dispatch) => {
  dispatch({
    type: SHOW_ALERT,
  });
};
