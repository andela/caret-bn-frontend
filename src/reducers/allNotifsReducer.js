import { GET_ALL_NOTIF_SUCCESS, GET_ALL_NOTIF_ERROR } from '../actions/types';

const initialState = {
  notifsData: null,
  notifsDataError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIF_SUCCESS:
      return {
        ...state,
        notifsData: action.payload.data,
        notifsDataError: null,
      };
    case GET_ALL_NOTIF_ERROR:
      return {
        ...state,
        notifsData: null,
        notifsDataError: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
