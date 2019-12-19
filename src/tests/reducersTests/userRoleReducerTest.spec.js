import userReducer from '../../reducers/userReducer';
import roleReducer from '../../reducers/roleReducer';
import { GET_USERS, GET_USERS_ERROR, GET_SPECIFIC_USER, GET_SPECIFIC_USER_ERROR, FETCH_ROLES, FETCH_ROLES_ERROR, ASSIGN_ROLE, ASSIGN_ROLE_ERROR } from "../../actions/types";

describe('User Roles Reducer Tests ', () => {
    it('Should return default state for users', () => {
        const inistialState = userReducer(undefined, {});
        expect(inistialState).toEqual({
            "allUserData": null,
            "allUserError": null,
            "userData": null,
            "userError": null,
            "status": '',
        });
    });

    it('Should return default state for roles', () => {
        const inistialState = roleReducer(undefined, {});
        expect(inistialState).toEqual({
            "roleData": null,
            "roleError": null,
            "assignedRoleData": null,
            "assignedRoleError": null,
            "roleStatus": '',
            "assignedRoleStatus": '',
        });
    });

    it('Should handle GET_USERS ', () => {
        const successAction = {
            type: GET_USERS,
            payload: {
                message:'users retrieved successfully!'
            }
        }
        const returnedSate = userReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "allUserData": successAction.payload,
            "allUserError": null,
            "userData": null,
            "userError": null,
            "status": 'Success',
        })
    });

    it('Should handle GET_USERS_ERROR ', () => {
        const failureAction = {
            type: GET_USERS_ERROR,
            payload: {
                data: {
                    message: "No user found!"
                }
            }
        }
        const returnedSate = userReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "allUserData": null,
            "allUserError": failureAction.payload,
            "userData": null,
            "userError": null,
            "status": 'Failure',
        })
    });

    it('Should handle GET_SPECIFIC_USER ', () => {
        const successAction = {
            type: GET_SPECIFIC_USER,
            payload: {
                message:'user retrieved successfully!'
            }
        }
        const returnedSate = userReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "allUserData": null,
            "allUserError": null,
            "userData": successAction.payload,
            "userError": null,
            "status": 'Success',
        })
    });

    it('Should handle GET_SPECIFIC_USER_ERROR ', () => {
        const failureAction = {
            type: GET_SPECIFIC_USER_ERROR,
            payload: {
                data: {
                    message: "No user found!"
                }
            }
        }
        const returnedSate = userReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "allUserData": null,
            "allUserError": null,
            "userData": null,
            "userError": failureAction.payload,
            "status": 'Failure',
        })
    });

    it('Should handle FETCH_ROLES ', () => {
        const successAction = {
            type: FETCH_ROLES,
            payload: {
                message:'Roles retrieved successfully!'
            }
        }
        const returnedSate = roleReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "roleData": successAction.payload,
            "roleError": null,
            "assignedRoleData": null,
            "assignedRoleError": null,
            "roleStatus": 'Success',
            "assignedRoleStatus": '',
        })
    });

    it('Should handle FETCH_ROLES_ERROR ', () => {
        const failureAction = {
            type: FETCH_ROLES_ERROR,
            payload: {
                data: {
                    message: "No user found!"
                }
            }
        }
        const returnedSate = roleReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "roleData": null,
            "roleError": failureAction.payload,
            "assignedRoleData": null,
            "assignedRoleError": null,
            "roleStatus": 'Failure',
            "assignedRoleStatus": '',
        })
    });

    it('Should handle ASSIGN_ROLE ', () => {
        const successAction = {
            type: ASSIGN_ROLE,
            payload: {
                message:'Role assigned successfully!'
            }
        }
        const returnedSate = roleReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "roleData": null,
            "roleError": null,
            "assignedRoleData": successAction.payload,
            "assignedRoleError": null,
            "roleStatus": '',
            "assignedRoleStatus": 'Success',
        })
    });

    it('Should handle ASSIGN_ROLE_ERROR ', () => {
        const failureAction = {
            type: ASSIGN_ROLE_ERROR,
            payload: {
                data: {
                    message: "No role assigned!"
                }
            }
        }
        const returnedSate = roleReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "roleData": null,
            "roleError": null,
            "assignedRoleData": null,
            "assignedRoleError": failureAction.payload,
            "roleStatus": '',
            "assignedRoleStatus": 'Failure',
        })
    });

    
    

}); 