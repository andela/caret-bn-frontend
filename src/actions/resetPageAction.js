import { RESET_PAGE, RESET_PAGE_FALSE } from './types';

export const resetPageAction = () => async (dispatch) => {
  dispatch({ type: RESET_PAGE });
};

export const cancelResetPageAction = () => async (dispatch) => {
  dispatch({ type: RESET_PAGE_FALSE });
};
