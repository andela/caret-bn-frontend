import {getUsers, getSpecificUser} from "../../actions/userActions";
import { getRoles, assignRole } from "../../actions/roleActions";
import { GET_USERS, GET_USERS_ERROR, GET_SPECIFIC_USER, GET_SPECIFIC_USER_ERROR, FETCH_ROLES, FETCH_ROLES_ERROR, ASSIGN_ROLE, ASSIGN_ROLE_ERROR } from "../../actions/types";
import responses from "../mocks/responses";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "regenerator-runtime";
import backendCall from "../../helpers/backendCall";

const { users, usersError, user, roles, rolesError, assignedRole, assignedRoleError } = responses;

let store;

const mockedStore = configureStore([thunk]);
const cleanUp = () => new Promise((resolve) => setImmediate(resolve));

describe('User Roles Tests ', () => {
    beforeEach(() => {
        store = mockedStore();
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should successfully retrieve users ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(users);
            await cleanUp();
        });
        await store.dispatch(getUsers());
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(GET_USERS)
    });

    it('Should fail to retrieve users ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(usersError);
            await cleanUp();
        });
        await store.dispatch(getUsers('m'));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(GET_USERS_ERROR)
    });
    it('Should successfully retrieve one user ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(user);
            await cleanUp();
        });
        await store.dispatch(getSpecificUser(1));
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(GET_SPECIFIC_USER)
    });

    it('Should fail to retrieve one user ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(usersError);
            await cleanUp();
        });
        await store.dispatch(getSpecificUser('m'));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(GET_SPECIFIC_USER_ERROR)
    });

    it('Should successfully retrieve all roles ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(roles);
            await cleanUp();
        });
        await store.dispatch(getRoles());
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(FETCH_ROLES)
    });

    it('Should fail to retrieve all roles ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(rolesError);
            await cleanUp();
        });
        await store.dispatch(getRoles('m'));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(FETCH_ROLES_ERROR)
    });
    
    it('Should successfully assign a role to user number 1 ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(assignedRole);
            await cleanUp();
        });
        await store.dispatch(assignRole(1, 'supplier'));
        const calledAction = store.getActions();
        
        expect(calledAction[0].type).toEqual(ASSIGN_ROLE)
    });

    it('Should fail to assign a role to user number 1 ', async () => {
        moxios.wait(async () => {
            const request = moxios.requests.mostRecent();
            request.respondWith(assignedRoleError);
            await cleanUp();
        });
        await store.dispatch(assignRole('m'));
        const calledAction = store.getActions();

        expect(calledAction[0].type).toEqual(ASSIGN_ROLE_ERROR)
    });

});