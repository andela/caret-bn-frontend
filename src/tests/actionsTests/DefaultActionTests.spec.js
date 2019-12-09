import { DEFAULT_ACTION } from '../../actions/types';
import { fireReduxAction } from '../../actions/defaultAction';
import store from '../../reduxStore';

describe('Actions Test Suite', () => {
  it('Should run default actions', () => {
    const text = 'Redux is working';
    const expectedAction = {
      type: DEFAULT_ACTION,
      payload: text
    };
    const dispatch = store.dispatch(fireReduxAction());
    expect(dispatch).toEqual(expectedAction);
  });
});
