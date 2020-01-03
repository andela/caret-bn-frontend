import managerRequestReducer from '../../reducers/managerRequestReducer';
import { MANAGER_GET_REQUESTS_SUCCESS, MANAGER_GET_REQUESTS_FAIL, MANAGER_SEARCH_REQUESTS_SUCCESS, MANAGER_SEARCH_REQUESTS_FAIL, } from '../../actions/types';

describe('Update Profile Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = managerRequestReducer(undefined, {});
        expect(inistialState).toEqual({
            "data": null,
            "dataError": null,
        });
    });
    it('Should handle UPDATE_PROFILE_SUCCESS ', () => {
        const successAction = {
            type: MANAGER_GET_REQUESTS_SUCCESS,
            payload: {
                message:'Profile updated successfully!'
            }
        }
        const returnedSate = managerRequestReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "dataError": null,
            "data": successAction.payload
        })
    });

    it('Should handle UPDATE_PROFILE_FAIL ', () => {
        const failureAction = {
            type: MANAGER_GET_REQUESTS_FAIL,
            payload: {
                data: {
                    message: "This profile not updated!"
                }
            }
        }
        const returnedSate = managerRequestReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "dataError": failureAction.payload,
            "data": null
        })
    });
});
