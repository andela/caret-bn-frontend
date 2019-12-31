import ratingsReducer from '../../reducers/ratingsReducer';
import { RATE_ACCOMMODATION_ERROR, RATE_ACCOMMODATION } from '../../actions/types';

describe('Login Reducer Tests ', () => {
  it('Should return default state', () => {
    const inistialState = ratingsReducer(undefined, {});
    expect(inistialState).toEqual({
      "status": '',
      "data": null,
      "dataError": null
    });
  });

  it('Should handle successful rating ', () => {
    const successAction = {
      type: RATE_ACCOMMODATION,
      payload: {
        message: 'Successfully rated accommodation!'
      }
    }
    const returnedSate = ratingsReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      "status": 'success',
      "dataError": '',
      "data": successAction.payload
    })
  });

  it('Should handle LOGIN_FAILURE ', () => {
    const failureAction = {
      type: RATE_ACCOMMODATION_ERROR,
      payload: {
        data: {
          message: "Bad Request!"
        }
      }
    }
    const returnedSate = ratingsReducer(undefined, failureAction);
    expect(returnedSate).toEqual({
      "status": 'error',
      "dataError": failureAction.payload,
      "data": ""
    })
  });
}); 
