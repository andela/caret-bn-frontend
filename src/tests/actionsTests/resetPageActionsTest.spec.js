import { RESET_PAGE, RESET_PAGE_FALSE } from "../../actions/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import { resetPageAction, cancelResetPageAction } from "../../actions/resetPageAction";

let store;
const mockedStore = configureStore([thunk]);

describe('Reset Action Tests ', () => {
  beforeEach(() => {
    store = mockedStore();
  });

  it('Should successfully resetPage', async () => {
    store.dispatch(resetPageAction());
    const calledAction = store.getActions();

    expect(calledAction[0].type).toEqual(RESET_PAGE)
  });

  it('Should successfully cancelResetPage', async () => {
    store.dispatch(cancelResetPageAction());
    const calledAction = store.getActions();

    expect(calledAction[0].type).toEqual(RESET_PAGE_FALSE)
  });

});