import searchRequestsReducer from '../../reducers/searchRequestsReducer';
import { SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL } from '../../actions/types';

describe('Search Requests Reducer Test Suite', () => {
  it('Should return default state', () => {
    const newState = searchRequestsReducer(undefined, {});
    expect(newState).toEqual({
      "searchData": null,
      "searchDataError": null,
      "status": '',
    });
  });

  it('Should return SEARCH_REQUESTS_SUCCESS', () => {
    const action = {
      type: SEARCH_REQUESTS_SUCCESS,
      payload: {
        status: 200,
        data: {
          message: 'Got Requests...'
        }
      }
    }
    const returnedSate = searchRequestsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "searchData": action.payload.data,
      "searchDataError": null,
      "status": 'success',
    })
  });

  it('Should return SEARCH_REQUESTS_FAIL', () => {
    const action = {
      type: SEARCH_REQUESTS_FAIL,
      payload: {
        status: 404,
        data: {
          message: 'No Requests!!!'
        }
      }
    }
    const returnedSate = searchRequestsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "searchData": null,
      "searchDataError": action.payload,
      "status": 'error',
    });
  });

});