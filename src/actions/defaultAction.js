/* eslint-disable import/prefer-default-export */
import { DEFAULT_ACTION } from './types';

export const fireReduxAction = () => (dispatch) => dispatch({
  type: DEFAULT_ACTION,
  payload: 'Redux is working',
});
