import { HIDE_ALERT, SHOW_ALERT } from "../../actions/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import { hideAlert, showAlert } from "../../actions/alertAction";

let store;
const mockedStore = configureStore([thunk]);

describe('Alert Action Tests ', () => {
  beforeEach(() => {
    store = mockedStore();
  });

  it('Should successfully hide the alert component ', async () => {
    store.dispatch(hideAlert());
    const calledAction = store.getActions();

    expect(calledAction[0].type).toEqual(HIDE_ALERT)
  });

  it('Should successfully show the alert component ', async () => {
    store.dispatch(showAlert());
    const calledAction = store.getActions();
    expect(calledAction[0].type).toEqual(SHOW_ALERT)
  });

});