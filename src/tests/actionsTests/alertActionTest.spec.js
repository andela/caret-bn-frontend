import { HIDE_ALERT } from "../../actions/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import {hideAlert} from "../../actions/alertAction";

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

});