import authReducer from '../../reducers/authReducer';
import { SIGNUP_FAIL, SIGNUP_SUCCESS } from '../../actions/types';

describe('Signup Reducer Test Suite', () => {
    it('Should return default state', () => {
        const newState = authReducer(undefined, {});
        expect(newState).toEqual({
          "data": null,
          "dataError": null,
          "status": '',
        });
    });

    it('Should return SIGNUP_SUCCESS', () => {
        const action = {
            type: SIGNUP_SUCCESS,
            payload: {
              status: 201,
              data: {
                message: 'Gotcha...'
              }
            }
        }
        const returnedSate = authReducer(undefined, action);
        expect(returnedSate).toEqual({
          "dataError": null,
          "data": action.payload,
          "status": 'success',
        })
    });

    it('Should return SIGNUP_FAIL', () => {
        const action = {
            type: SIGNUP_FAIL,
            payload: {
              status: 400,
              data: {
                message: 'Ooops!!!'
              }
            }
        }
        const returnedSate = authReducer(undefined, action);
        expect(returnedSate).toEqual({
          "data": null,
          "dataError": action.payload,
          "status": 'error',
        });
    });
});