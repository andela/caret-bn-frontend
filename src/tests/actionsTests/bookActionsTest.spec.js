import {BookAccommodation} from "../../actions/bookingActions";
import { BOOK_FAILURE } from "../../actions/types";
import responses from "../mocks/responses";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import backendCall from "../../helpers/backendCall";

const { bookingsError } = responses;

let store;

const mockedStore = configureStore([thunk]);
const cleanUp = () => new Promise((resolve) => setImmediate(resolve));

describe('Booking Accommodation Tests ', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });


    it('Should fail to book accommodation ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(bookingsError);
            await cleanUp();
        });
        await store.dispatch(BookAccommodation('2019-12-30', '2019-12-30', 2, 5));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(BOOK_FAILURE)
    });
});
