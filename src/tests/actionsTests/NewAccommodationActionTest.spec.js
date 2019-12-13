import createAccommodation from "../../actions/accommodationActions";
import { ADD_ACCOMMODATION_SUCESS, ADD_ACCOMMODATION_FAILURE } from "../../actions/types";
import responses from "../mocks/responses";
import mockData from '../mocks/mockData'
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import backendCall from "../../helpers/backendCall";

const { newAccommodationCreated, newAccommodationFailed } = responses;
const { newAccommodationDetails } = mockData;

let store;

const wrongInfo = { names: 'test accommodation' };
const mockedStore = configureStore([thunk]);
const cleanUp = () => new Promise((resolve) => setImmediate(resolve));

describe('Creating new Accommodation Tests ', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should successfully create accommodation ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(newAccommodationCreated);
            await cleanUp();
        });
        await store.dispatch(createAccommodation(newAccommodationDetails));
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(ADD_ACCOMMODATION_SUCESS)
    });

    it('Should fail to create accommodation ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(newAccommodationFailed);
            await cleanUp();
        });
        await store.dispatch(createAccommodation(wrongInfo));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(ADD_ACCOMMODATION_FAILURE)
    });
});