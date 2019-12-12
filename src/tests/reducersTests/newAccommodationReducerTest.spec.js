import AccommodationReducer from '../../reducers/AccommodationReducer';
import { ADD_ACCOMMODATION_FAILURE, ADD_ACCOMMODATION_SUCESS } from '../../actions/types';

describe('Create accommodation Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = AccommodationReducer(undefined, {});
        expect(inistialState).toEqual({
            "accommodationData": null,
            "accommodationError": null,
            "status": '',
        });
    });

    it('Should handle ADD_ACCOMMODATION_SUCESS ', () => {
        const successAction = {
            type: ADD_ACCOMMODATION_SUCESS,
            payload: {
                message:'Accommodation created successfully!'
            }
        }
        const returnedSate = AccommodationReducer(undefined, successAction);
        expect(returnedSate).toEqual({
            "status": 'Success',
            "accommodationError": null,
            "accommodationData": successAction.payload
        })
    });

    it('Should handle ADD_ACCOMMODATION_FAILURE ', () => {
        const failureAction = {
            type: ADD_ACCOMMODATION_FAILURE,
            payload: {
                data: {
                    message: "This accommodation already exists!"
                }
            }
        }
        const returnedSate = AccommodationReducer(undefined, failureAction);
        expect(returnedSate).toEqual({
            "status": 'Failure',
            "accommodationError": failureAction.payload,
            "accommodationData": null
        })
    });

}); 