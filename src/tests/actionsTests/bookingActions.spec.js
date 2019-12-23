import moxios from 'moxios';
import { getBookings, BookAccommodation } from '../../actions/bookingActions';
import backendCall from '../../helpers/backendCall';
import testStore from '../../utilities/tests/mockStore';

const bookings = [
    {
        id: 1,
        name: 'Zinizir'
    },
    {
        id: 1,
        name: 'Zodethsa'
    },
    {
        id: 1,
        name: 'Pa Kamaba'
    },
    {
        id: 1,
        name: 'Stereo'
    }

];
const BookedData = {
    checkInDate: '2019-12-21',
	checkOutDate: '2020-01-01',
	accomodationId: 6,
	roomsNumber: 1
    
  }

describe('Booking Actions Test Suite', () => {

    beforeEach(() => {
        moxios.install(backendCall);
    });

    afterEach(() => {
        moxios.uninstall(backendCall);
    });

    it('Should return booking data', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: bookings
            });
        });

        const expectedState = {
            data: bookings,
            dataError: null,
            booked: null,
            bookedError: null,
            status: 'success'
        };

        const store = testStore();
        return store.dispatch(getBookings()).then(() => {
            const state = store.getState();
            expect(state.bookings).toEqual(expectedState);
        });
    });
    it('Should return book accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response:'Booking done successfully'
            });
        });

        const expectedState = {
            data: bookings,
            dataError: null,
            booked: null,
            bookedError: null,
            status: 'success'
        };

        const store = testStore();
        return store.dispatch(BookAccommodation()).then(() => {
            const state = store.getState();
            expect(state.bookings.booked).toEqual('Booking done successfully');
        });
    });

    it('Should fail on book accommodation', async () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 400,
                response:'Error'
            });
        });

        const expectedState = {
            data: bookings,
            dataError: null,
            booked: null,
            bookedError: null,
            status: 'success'
        };

        const store = testStore();
        return store.dispatch(BookAccommodation()).then(() => {
            const state = store.getState();
            expect(state.bookings.bookedError).toEqual('Error');
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

        return store.dispatch(getBookings()).then(() => {
            const state = store.getState();
            expect(state.bookings.status).toEqual('error');
        });
    });

});
