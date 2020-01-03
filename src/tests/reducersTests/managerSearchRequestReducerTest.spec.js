import managerSearchRequestReducer from '../../reducers/managerSearchRequestReducer';
import { MANAGER_SEARCH_REQUESTS_SUCCESS, MANAGER_SEARCH_REQUESTS_FAIL, } from '../../actions/types';

describe('Update Profile Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = managerSearchRequestReducer(undefined, {});
        expect(inistialState).toEqual({
            managerSearchData: null,
            managerSearchDataError: null,
            status: '',
        });
    });
    it('Should handle MANAGER_SEARCH_REQUESTS_SUCCESS ', () => {
        const successAction = {
            type: MANAGER_SEARCH_REQUESTS_SUCCESS,
            payload: {
                message:'Get request successfully!'
            }
        }
        const returnedSate = managerSearchRequestReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "managerSearchData": successAction.payload.data,
            "managerSearchDataError": null,
            "status": 'success'
        })
    });

    it('Should handle MANAGER_SEARCH_REQUESTS_FAIL ', () => {
        const failureAction = {
            type: MANAGER_SEARCH_REQUESTS_FAIL,
            payload: {
                data: {
                    message: "This profile not updated!"
                }
            }
        }
        const returnedSate = managerSearchRequestReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "managerSearchData": null,
            "managerSearchDataError": failureAction.payload,
            "status": 'error',
        })
    });
});
