import authActions from "../../actions/authActions";
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../../actions/types";
import responses from "../mocks/responses";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import backendCall from "../../helpers/backendCall";
import userLogin from "../../actions/authActions";

const { loginFailure, loginSuccess } = responses;

let store;
const userInfo = { email: 'caretmanager@gmail.com', password: 'Pa55w0rd' };
const wrongInfo = { email: 'email', passworf: 'password' };
const mockedStore = configureStore([thunk]);
const cleanUp = () => new Promise((resolve) => setImmediate(resolve));

describe('Login Action Tests ', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should successfully login ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(loginSuccess);
            await cleanUp();
        });
        await store.dispatch(userLogin(userInfo));
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(LOGIN_SUCCESS)
    });

    it('Should fail to login ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(loginFailure);
            await cleanUp();
        });
        await store.dispatch(userLogin(wrongInfo));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(LOGIN_FAILURE)
    });
});