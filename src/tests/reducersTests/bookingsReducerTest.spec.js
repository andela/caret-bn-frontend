import bookingsReducer from '../../reducers/bookingsReducer';
import { BOOK_FAILURE } from "../../actions/types";

describe('User Bookings Reducer Tests ', () => {
    it('Should return default state for users', () => {
        const inistialState = bookingsReducer(undefined, {});
        expect(inistialState).toEqual({
            "data": null,
            "dataError": null,
            "booked": null,
            "bookedError": null,
            "status": '',
        });
    });


    it('Should handle BOOK_FAILURE ', () => {
        const successAction = {
            type: BOOK_FAILURE,
            payload: {
                message:'Booking Failed'
            }
        }
        const returnedSate = bookingsReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "data": null,
            "dataError": null,
            "booked": null,
            "bookedError": successAction.payload,
            "status": 'error',
        })
    });
}); 