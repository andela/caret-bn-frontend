import resetPasswordReducer from '../../reducers/resetPasswordReducer';
import { RESET_PASSWORD_REQUEST_SUCESS, RESET_PASSWORD_REQUEST_FAILURE, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
} from '../../actions/types';

describe('ResetPassword Reducer Test Suite', () => {
    it('Should return default state', () => {
        const newState = resetPasswordReducer(undefined, {});
        expect(newState).toEqual({
          state: {
            "pass": {},
            "passwordError": {}
          }
        });
    });

    it('Should return RESET_PASSWORD_REQUEST_SUCESS', () => {
        const action = {
            type: RESET_PASSWORD_REQUEST_SUCESS,
            payload: {
              status: 200,
              data: {
                message: 'please check your email to see the link for reseting password'
              }
            }
        }
        const returnedSate = resetPasswordReducer(undefined, action);
        expect(returnedSate).toEqual({
        
          "pass": action.payload,
          "passwordError": {}
        })
    });

    it('Should return RESET_PASSWORD_REQUEST_FAILURE', () => {
      const action = {
          type: RESET_PASSWORD_REQUEST_FAILURE,
          payload: {
            status: 404,
            data: {
              message: 'can not find that user'
            }
          }
      }
      const returnedSate = resetPasswordReducer(undefined, action);
      expect(returnedSate).toEqual({
        "pass": {},
        "passwordError":action.payload,
      });
  });

    it('Should return RESET_PASSWORD_SUCCESS', () => {
      const action = {
          type: RESET_PASSWORD_SUCCESS,
          payload: {
            status: 200,
            data: {
              message: 'password changed successfully'
            }
          }
      }
      const returnedSate = resetPasswordReducer(undefined, action);
      expect(returnedSate).toEqual({
        "pass": action.payload,
        "passwordError": {}
      })
  });

  it('Should return RESET_PASSWORD_FAILURE', () => {
      const action = {
          type: RESET_PASSWORD_FAILURE,
          payload: {
            status: 400,
            data: {
              message: 'Token expired request a new one'
            }
          }
      }
      const returnedSate = resetPasswordReducer(undefined, action);
      expect(returnedSate).toEqual({
        "pass": {},
        "passwordError":action.payload,
      });
  });
});