import { GET_ALL_NOTIF_SUCCESS, GET_ALL_NOTIF_ERROR, NEW_NOTIFICATION } from '../actions/types';

const initialState = {
  notifsData: [],
  notifsDataError: null,
  newNotif: null,
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
        notifsData: [],
        notifsDataError: action.payload,
      };
    case NEW_NOTIFICATION:
      return {
        ...state,
        newNotif: action.payload,
        notifsData: [...state.notifsData, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
