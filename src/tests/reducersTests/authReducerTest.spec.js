import authReducer from '../../reducers/authReducer';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../../actions/types';

describe('Login Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = authReducer(undefined, {});
        expect(inistialState).toEqual({
            "status": '',
            "data": null,
            "dataError": null
        });
    });

    it('Should handle LOGIN_SUCCESS ', () => {
        const successAction = {
            type: LOGIN_SUCCESS,
            payload: {
                message:'User logged in successfully!'
            }
        }
        const returnedSate = authReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'Success',
            "dataError": null,
            "data": successAction.payload
        })
    });

    it('Should handle LOGIN_FAILURE ', () => {
        const failureAction = {
            type: LOGIN_FAILURE,
            payload: {
                data: {
                    message: "Incorrect email or password!"
                }
            }
        }
        const returnedSate = authReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'Failure',
            "dataError": failureAction.payload,
            "data": null
        })
    });

}); 