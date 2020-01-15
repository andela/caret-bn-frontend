import allNotifsReducer from '../../reducers/allNotifsReducer';
import { GET_ALL_NOTIF_SUCCESS, GET_ALL_NOTIF_ERROR, NEW_NOTIFICATION } from '../../actions/types';

describe('All Notifications Reducer Test Suite', () => {
  it('Should return default state', () => {
    const newState = allNotifsReducer(undefined, {});
    expect(newState).toEqual({
      "notifsData": [],
      "notifsDataError": null,
      "newNotif": null,
    });
  });

  it('Should return GET_ALL_NOTIF_SUCCESS', () => {
    const action = {
      type: GET_ALL_NOTIF_SUCCESS,
      payload: {
        status: 200,
        data: {
          message: 'Got Notifications...'
        }
      }
    }
    const returnedSate = allNotifsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "notifsData": action.payload.data,
      "notifsDataError": null,
      "newNotif": null,
    })
  });

  it('Should return GET_ALL_NOTIF_ERROR', () => {
    const action = {
      type: GET_ALL_NOTIF_ERROR,
      payload: {
        status: 404,
        data: {
          message: 'No Notifications!!!'
        }
      }
    }
    const returnedSate = allNotifsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "notifsData": [],
      "notifsDataError": action.payload,
      "newNotif": null,
    });
  });

  it('Should return NEW_NOTIFICATION', () => {
    const action = {
      type: NEW_NOTIFICATION,
      payload: {},
    }
    const returnedSate = allNotifsReducer(undefined, action);
    expect(returnedSate).toEqual({
      "notifsData": [action.payload],
      "notifsDataError": null,
      "newNotif": action.payload,
    });
  });

});