import locationReducer from '../../reducers/locationReducer';
import { TOP_DESTINATIONS, TOP_DESTINATIONS_ERROR } from '../../actions/types';

describe('Location Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = locationReducer(undefined, {});
        expect(inistialState).toEqual({
            "data": null,
            "dataError": null,
            "status": '',
            "topData": null,
            "topError": null,
            "topStatus": '',
        });
    });

    it('Should handle TOP_DESTINATIONS ', () => {
        const successAction = {
            type: TOP_DESTINATIONS,
            payload: {
                message:'Top 5 locations'
            }
        }
        const returnedSate = locationReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "data": null,
            "dataError": null,
            "status": '',
            "topStatus": 'success',
            "topError": null,
            "topData": successAction.payload
        })
    });

    it('Should handle TOP_DESTINATIONS_ERROR ', () => {
        const failureAction = {
            type: TOP_DESTINATIONS_ERROR,
            payload: {
                data: {
                    message: "No location found"
                }
            }
        }
        const returnedSate = locationReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "data": null,
            "dataError": null,
            "status": '',
            "topStatus": 'error',
            "topError": failureAction.payload,
            "topData": null
        })
    });

}); 