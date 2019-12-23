import processRequestReducer from '../../reducers/processRequestReducer';
import { PROCESS_REQUEST_SUCCESS, PROCESS_REQUEST_ERROR } from '../../actions/types';

describe('Requests Reducer Test Suite', () => {
  it('Should return default state', () => {
    const newState = processRequestReducer(undefined, {});
    expect(newState).toEqual({
      "processData": null,
      "processError": null,
      "status": '',
    });
  });

  it('Should return PROCESS_REQUEST_SUCCESS', () => {
    const action = {
      type: PROCESS_REQUEST_SUCCESS,
      payload: {
        status: 200,
        data: {
          message: 'Request Successfully Approved!'
        }
      }
    }
    const returnedSate = processRequestReducer(undefined, action);
    expect(returnedSate).toEqual({
      "processData": action.payload,
      "processError": null,
      "status": 'success',
    })
  });

  it('Should return PROCESS_REQUEST_ERROR', () => {
    const action = {
      type: PROCESS_REQUEST_ERROR,
      payload: {
        status: 400,
        data: {
          message: 'Request Already Approved!'
        }
      }
    }
    const returnedSate = processRequestReducer(undefined, action);
    expect(returnedSate).toEqual({
      "processData": null,
      "processError": action.payload,
      "status": 'error',
    });
  });

});
