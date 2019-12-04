import verifyUserReducer from '../../reducers/verifyUserReducer';
import { VERIFY_SUCCESS, VERIFY_ERROR, VERIFY_PENDING } from '../../actions/types';

describe('User verify Reducer Test Suite', () => {
    it('Should return VERIFY_SUCCESS', () => {
        const action = {
            type: VERIFY_SUCCESS,
            payload: {
              status: 201,
              data: {
                message: 'Gotcha...'
              }
            }
        }
        const returnedSate = verifyUserReducer(undefined, action);
        expect(returnedSate).toEqual({
          "error": null,
          "payload": action.payload,
        })
    });

    it('Should return VERIFY_ERROR', () => {
        const action = {
            type: VERIFY_ERROR,
            payload: {
              status: 400,
              data: {
                message: 'Ooops!!!'
              }
            }
        }
        const returnedSate = verifyUserReducer(undefined, action);
        expect(returnedSate).toEqual({
          "payload": null,
          "error": action.payload,
        });
    });
});
