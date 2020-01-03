import {
  GET_ALL_NOTIF_SUCCESS, GET_ALL_NOTIF_ERROR, MARK_ONE_NOTIF_SUCCESS, MARK_ONE_NOTIF_ERROR, MARK_ALL_NOTIF_SUCCESS, MARK_ALL_NOTIF_ERROR, SWITCH_NOTIF_SUCCESS, SWITCH_NOTIF_ERROR,
} from './types';
import backendCall from '../helpers/backendCall';
import { getToken } from '../helpers/authHelper';

const notifType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const getNotifsAction = () => (dispatch) => backendCall.get('/notifications', { headers })
  .then((response) => {
    dispatch(notifType(GET_ALL_NOTIF_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(notifType(GET_ALL_NOTIF_ERROR, error.response.data));
  });

export const markOneNotifAction = (notifId) => (dispatch) => backendCall.patch(`/notifications/${notifId}/mark`, {}, { headers })
  .then((response) => {
    dispatch(notifType(MARK_ONE_NOTIF_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(notifType(MARK_ONE_NOTIF_ERROR, error.response.data));
  });

export const markAllNotifAction = (action) => (dispatch) => backendCall.patch(`/notifications/mark-all/${action}`, {}, { headers })
  .then((response) => {
    dispatch(notifType(MARK_ALL_NOTIF_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(notifType(MARK_ALL_NOTIF_ERROR, error.response.data));
  });

export const switchNotifAction = (switchParam) => (dispatch) => backendCall.patch(`/users/${switchParam}`, {}, { headers })
  .then((response) => {
    dispatch(notifType(SWITCH_NOTIF_SUCCESS, response.data));
  })
  .catch((error) => {
    dispatch(notifType(SWITCH_NOTIF_ERROR, error.response.data));
  });
