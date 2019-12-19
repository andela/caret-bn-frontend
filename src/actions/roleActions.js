import {
  ASSIGN_ROLE, ASSIGN_ROLE_ERROR, FETCH_ROLES, FETCH_ROLES_ERROR, SHOW_ALERT,
} from './types';
import { getToken } from '../helpers/authHelper';
import backendCall from '../helpers/backendCall';

const roleType = (type, payload) => ({
  type,
  payload,
});

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const getRoles = () => async (dispatch) => {
  try {
    const res = await backendCall.get('/admin/roles/', { headers });
    dispatch(roleType(FETCH_ROLES, res.data));
  } catch (error) {
    dispatch(roleType(FETCH_ROLES_ERROR, error.response));
  }
};
export const assignRole = (userId, Role) => async (dispatch) => {
  try {
    const res = await backendCall.patch(`/admin/roles/assign/${userId}`, { Role }, { headers });
    dispatch(roleType(ASSIGN_ROLE, res.data));
    dispatch(roleType(SHOW_ALERT));
  } catch (error) {
    dispatch(roleType(ASSIGN_ROLE_ERROR, error.response));
    dispatch(roleType(SHOW_ALERT));
  }
};
