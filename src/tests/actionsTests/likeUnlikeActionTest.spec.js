import {likeUnlikeAccommodation} from "../../actions/accommodationActions";
import { LIKE_ACCOMMODATION, LIKE_ACCOMMODATION_ERROR } from "../../actions/types";
import responses from "../mocks/responses";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import backendCall from "../../helpers/backendCall";

const { liked, likeFailed } = responses;

let store;

const mockedStore = configureStore([thunk]);
const cleanUp = () => new Promise((resolve) => setImmediate(resolve));

describe('Like and dislike Accommodation Tests ', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should successfully like an accommodation ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(liked);
            await cleanUp();
        });
        await store.dispatch(likeUnlikeAccommodation('slug', 'like'));
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(LIKE_ACCOMMODATION)
    });

    it('Should fail to like accommodation twice ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(likeFailed);
            await cleanUp();
        });
        await store.dispatch(likeUnlikeAccommodation('slug', 'like'));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(LIKE_ACCOMMODATION_ERROR)
    });
});
