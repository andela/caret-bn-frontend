import AccommodationReducer from '../../reducers/AccommodationReducer';
import { ADD_ACCOMMODATION_FAILURE, ADD_ACCOMMODATION_SUCESS, ALL_ACCOMMODATION_SUCCESS, ALL_ACCOMMODATION_FAILURE, SINGLE_ACCOMMODATION_SUCCESS, SINGLE_ACCOMMODATION_FAILURE, LIKE_ACCOMMODATION, LIKE_ACCOMMODATION_ERROR, HIGH_RATED_SUCCESS, HIGH_RATED_FAILURE } from '../../actions/types';

describe('Create accommodation Reducer Tests ', () => {
  it('Should return default state', () => {
    const inistialState = AccommodationReducer(undefined, {});
    expect(inistialState).toEqual({
      "accommodationData": null,
      "accommodationError": null,
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "status": '',
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": null,
    });
  });

  it('Should handle ADD_ACCOMMODATION_SUCESS ', () => {
    const successAction = {
      type: ADD_ACCOMMODATION_SUCESS,
      payload: {
        message: 'Accommodation created successfully!'
      }
    }
    const returnedSate = AccommodationReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      "status": 'Success',
      "accommodationError": null,
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "accommodationData": successAction.payload,
      "getAccommodation": [],
      "getAccommodationError": {},
      "highRated": null,
      "hihRatedError": null,
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": null,
    })
  });

  it('Should handle LIKE_ACCOMMODATION ', () => {
    const successAction = {
      type: LIKE_ACCOMMODATION,
      payload: {
        message: 'Liked successfully!'
      }
    }
    const returnedSate = AccommodationReducer(undefined, successAction);
    expect(returnedSate).toEqual({
      "status": '',
      "accommodationError": null,
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "accommodationData": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": successAction.payload,
      "dislike": null,
      "likeStatus": 'Success',
      "highRated": null,
      "hihRatedError": null,
    })
  });

  it('Should handle LIKE_ACCOMMODATION_ERROR ', () => {
    const failureAction = {
      type: LIKE_ACCOMMODATION_ERROR,
      payload: {
        data: {
          message: "This accommodation already exists!"
        }
      }
    }
    const returnedSate = AccommodationReducer(undefined, failureAction);
    expect(returnedSate).toEqual({
      "status": '',
      "accommodationError": null,
      "accommodationData": null,
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": failureAction.payload,
      "likeStatus": 'Failure',
      "highRated": null,
      "hihRatedError": null,
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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": action.payload.data,
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": null,

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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": action.payload,
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": null,
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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": action.payload.data,
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": null,
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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": action.payload,
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": null,
    });
  });

  it('Should return HIGH_RATED_SUCCESS', () => {
    const action = {
      type: HIGH_RATED_SUCCESS,
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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": action.payload,
      "hihRatedError": null,
    })
  });

  it('Should return HIGH_RATED_FAILURE', () => {
    const action = {
      type: HIGH_RATED_FAILURE,
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
      "updateError": null,
      "updateStatus": null,
      "updateSuccess": null,
      "getAccommodation": [],
      "getAccommodationError": {},
      "singleAccommodation": {},
      "singleAccommodationError": {},
      "like": null,
      "dislike": null,
      "likeStatus": '',
      "highRated": null,
      "hihRatedError": action.payload,
    });
  });


}); 