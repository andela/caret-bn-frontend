import authActions from "../../actions/authActions";
import { GET_LOCATIONS, GET_LOCATIONS_ERROR } from "../../actions/types";
import responses from "../mocks/responses";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import backendCall from "../../helpers/backendCall";
import {getLocations} from "../../actions/locationActions";

const { locations, locationsError } = responses;

let store;
const mockedStore = configureStore([thunk]);
const cleanUp = () => new Promise((resolve) => setImmediate(resolve));

describe('Locations Action Tests ', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should successfully retrieve locations ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(locations);
            await cleanUp();
        });
        await store.dispatch(getLocations());
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(GET_LOCATIONS)
    });

    it('Should fail retrieve location ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.reject({
                status: 400,
                message: 'error'
            });
            await cleanUp();
        });
        await store.dispatch(getLocations());
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(GET_LOCATIONS_ERROR)
    });
});