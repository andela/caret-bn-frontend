import { RATE_ACCOMMODATION, RATE_ACCOMMODATION_ERROR, SHOW_ALERT } from './types';
import backendCall from '../helpers/backendCall';
import { getToken } from '../helpers/authHelper';

const ratingsType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  Authorization: `Bearer ${token}`,
};

export const rateAccommodation = (ratings, setShow) => async (dispatch) => {
  try {
    const res = await backendCall.post('/ratings', ratings, { headers });

    dispatch(ratingsType(RATE_ACCOMMODATION, res.data));
    setShow(false);
    dispatch(ratingsType(SHOW_ALERT));
  } catch (error) {
    dispatch(ratingsType(RATE_ACCOMMODATION_ERROR, error.response));
    setShow(false);
    dispatch(ratingsType(SHOW_ALERT));
  }
};
