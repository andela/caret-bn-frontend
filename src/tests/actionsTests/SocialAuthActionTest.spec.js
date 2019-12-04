import { SOCIAL_AUTH_SUCCESS, SOCIAL_AUTH_ERROR } from '../../actions/types';
import store from '../../reduxStore';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockedStore = configureStore([thunk]);

describe('Social Auth Test Suite', () => {
    it('Should run default actions', () => {
        const emptyStore = mockedStore();
        const expectedAction = {
            type: SOCIAL_AUTH_ERROR,
            payload: 'Error Message'
        };
        const dispatch = emptyStore.dispatch({
            type: SOCIAL_AUTH_ERROR,
            payload: 'Error Message'
        });
        expect(dispatch).toEqual(expectedAction);
    });

    it('Should run default actions', () => {
        const expectedAction = {
            type: SOCIAL_AUTH_SUCCESS,
            payload: {
                username: 'Cheza',
                token: 'hello0029sdk20'
            },
        };
        const dispatch = store.dispatch({
            type: SOCIAL_AUTH_SUCCESS,
            payload: {
                username: 'Cheza',
                token: 'hello0029sdk20'
            },
        });
        expect(dispatch).toEqual(expectedAction);
    });

    it('Should get state', () => {
        const state = store.getState();
        const expectedState = {
            auth: {
                data: {
                    username: 'Cheza',
                    token: 'hello0029sdk20'
                },
                dataError: null,
                status: 'success'
            }
        };
        expect(state).toEqual(expectedState);
    });
});