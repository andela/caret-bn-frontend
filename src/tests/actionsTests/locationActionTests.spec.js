import moxios from 'moxios';
import { getLocations, getTopDestinations } from '../../actions/locationActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

const locations = [
    {
        id: 1,
        name: 'Blantyre'
    },
    {
        id: 2,
        name: 'Zomba'
    },
    {
        id: 3,
        name: 'Lilongwe'
    },
    {
        id: 4,
        name: 'Mzuzu'
    }

];

describe('Location Actions Test Suite', () => {

    beforeEach(() => {
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should return location data', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: locations
            });
        });

        const expectedState = {
            data: locations,
            dataError: null,
            status: 'success',
            topData: null,
            topError: null,
            topStatus: "",
        };

        const store = testStore();
        return store.dispatch(getLocations()).then(() => {
            const state = store.getState();
            expect(state.locations).toEqual(expectedState);
        });
    });
    it('Should dispatch error', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                message: 'Something went wrong'
            });
        });

        const store = testStore();

        return store.dispatch(getLocations()).then(() => {
            const state = store.getState();
            expect(state.locations.status).toEqual('error');
        });
    });

    it('Should return top destinations', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: locations
            });
        });

        const expectedState = {
            data: null,
            dataError: null,
            status: '',
            topData: locations,
            topError: null,
            topStatus: "success",
        };

        const store = testStore();
        return store.dispatch(getTopDestinations()).then(() => {
            const state = store.getState();
            expect(state.locations).toEqual(expectedState);
        });
    });

});
