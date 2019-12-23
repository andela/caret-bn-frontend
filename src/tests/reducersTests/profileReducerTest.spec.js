import profileReducer from '../../reducers/profileReducer';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from '../../actions/types';

describe('Update Profile Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = profileReducer(undefined, {});
        expect(inistialState).toEqual({
            "data": null,
            "dataError": null,
            "status": '',
        });
    });
    it('Should handle UPDATE_PROFILE_SUCCESS ', () => {
        const successAction = {
            type: UPDATE_PROFILE_SUCCESS,
            payload: {
                message:'Profile updated successfully!'
            }
        }
        const returnedSate = profileReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'success',
            "dataError": null,
            "data": successAction.payload
        })
    });

    it('Should handle GET_PROFILE ', () => {
        const successAction = {
            type: GET_PROFILE,
            payload: {
                message:'Profile updated successfully!'
            }
        }
        const returnedSate = profileReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'success',
            "dataError": null,
            "data": successAction.payload
        })
    });

    it('Should handle UPDATE_PROFILE_FAIL ', () => {
        const failureAction = {
            type: UPDATE_PROFILE_FAIL ,
            payload: {
                data: {
                    message: "This profile not updated!"
                }
            }
        }
        const returnedSate = profileReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'error',
            "dataError": failureAction.payload,
            "data": null
        })
    });

    it('Should handle UPDATE_PROFILE_FAIL ', () => {
        const failureAction = {
            type: PROFILE_ERROR ,
            payload: {
                data: {
                    message: "This profile not retrieved!"
                }
            }
        }
        const returnedSate = profileReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'error',
            "dataError": failureAction.payload,
            "data": null
        })
    });
}); 
