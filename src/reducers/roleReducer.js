import {
  ASSIGN_ROLE, ASSIGN_ROLE_ERROR, FETCH_ROLES, FETCH_ROLES_ERROR,
} from '../actions/types';

const initialState = {
  roleData: null,
  roleError: null,
  assignedRoleData: null,
  assignedRoleError: null,
  roleStatus: '',
  assignedRoleStatus: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ROLES:
      return {
        ...state,
        roleData: payload,
        roleStatus: 'Success',
      };
    case FETCH_ROLES_ERROR:
      return {
        ...state,
        roleError: payload,
        roleStatus: 'Failure',
      };
    case ASSIGN_ROLE:
      return {
        ...state,
        assignedRoleData: payload,
        assignedRoleError: null,
        assignedRoleStatus: 'Success',
      };
    case ASSIGN_ROLE_ERROR:
      return {
        ...state,
        assignedRoleError: payload,
        assignedRoleData: null,
        assignedRoleStatus: 'Failure',
      };
    default:
      return {
        ...state,
      };
  }
};
