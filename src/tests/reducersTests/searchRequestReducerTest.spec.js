import searchRequestsReducer from '../../reducers/searchRequestsReducer';
import { SEARCH_REQUESTS_SUCCESS, SEARCH_REQUESTS_FAIL } from '../../actions/types';

describe('Requests Reducer Test Suite', () => {
  it('Should return default state', () => {
    const newState = searchRequestsReducer(undefined, {});
    expect(newState).toEqual({
      "searchData": null,
      "searchDataError": null,
      "status": '',
    });
  });

it('Should return SEARCH_REQUESTS_FAIL ', () => {
    const failureAction = {
        type: SEARCH_REQUESTS_FAIL,
        payload: {
            data: {
                message: 'No Requests!!!'
            }
        }
    }
    const returnedSate = searchRequestsReducer(undefined, failureAction);
    expect(returnedSate).toEqual({
        "searchData": null,
        "searchDataError": failureAction.payload,
        "status": 'error',
    })
});

});
