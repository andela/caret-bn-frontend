import AccommodationReducer from '../../reducers/AccommodationReducer';
import { ADD_ACCOMMODATION_FAILURE, ADD_ACCOMMODATION_SUCESS,ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE, SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE } from '../../actions/types';

describe('Create accommodation Reducer Tests ', () => {
    it('Should return default state', () => {
        const inistialState = AccommodationReducer(undefined, {});
        expect(inistialState).toEqual({
            "accommodationData": null,
            "accommodationError": null,
            "status": '',
            "getAccommodation": [],
            "getAccommodationError": {},
            "singleAccommodation": {},
            "singleAccommodationError": {},
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
            "accommodationData": successAction.payload,
            "getAccommodation": [],
            "getAccommodationError": {},
            "singleAccommodation": {},
            "singleAccommodationError": {}
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
            "accommodationData": null,
            "getAccommodation": [],
            "getAccommodationError": {},
            "singleAccommodation": {},
            "singleAccommodationError": {}
        })
    });

    it('Should return ALL_ACCOMMODATION_SUCCESS', () => {
        const action = {
          type: ALL_ACCOMMODATION_SUCCESS,
          payload: {
            data: {
              message: 'Accommodation facilities are retrieved successfully!'
            }
          }
        }
        const returnedSate = AccommodationReducer(undefined, action);
        expect(returnedSate).toEqual({
            "status": "",
            "accommodationError": null,
            "accommodationData": null,
            "getAccommodation":action.payload.data,
            "getAccommodationError": {},
            "singleAccommodation": {},
            "singleAccommodationError": {}
          
        })
      });
    
      it('Should return ALL_ACCOMMODATION_FAILURE', () => {
        const action = {
          type: ALL_ACCOMMODATION_FAILURE,
          payload: {
            status: 400,
            data: {
              message: 'Invalid token please sign again'
            }
          }
        }
        const returnedSate = AccommodationReducer(undefined, action);
        expect(returnedSate).toEqual({
            "status": "",
            "accommodationError": null,
            "accommodationData": null,
            "getAccommodation": [],
            "getAccommodationError": action.payload,
            "singleAccommodation": {},
            "singleAccommodationError": {}
        });
      });
    
      it('Should return SINGLE_ACCOMMODATION_SUCCESS', () => {
        const action = {
          type: SINGLE_ACCOMMODATION_SUCCESS,
          payload: {
           
            data: {
              message: 'Accommodation retrieved successfully!'
            }
          }
        }
        const returnedSate = AccommodationReducer(undefined, action);
        expect(returnedSate).toEqual({
            "status": "",
            "accommodationError": null,
            "accommodationData": null,
            "getAccommodation": [],
            "getAccommodationError": {},
            "singleAccommodation": action.payload.data,
            "singleAccommodationError": {}
        })
      });
    
      it('Should return SINGLE_ACCOMMODATION_FAILURE', () => {
        const action = {
          type: SINGLE_ACCOMMODATION_FAILURE,
          payload: {
            status: 404,
            data: {
              message: 'Accommodation caret-hotelefd does not exist'
            }
          }
        }
        const returnedSate = AccommodationReducer(undefined, action);
        expect(returnedSate).toEqual({
            "status": "",
            "accommodationError": null,
            "accommodationData": null,
            "getAccommodation": [],
            "getAccommodationError": {},
            "singleAccommodation": {},
            "singleAccommodationError":action.payload,
        });
      });
    

}); 