import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';
import requestReducer from './requestReducer';
import requestsReducer from './requestsReducer';
import accommodationReducer from './AccommodationReducer';
import bookingsReducer from './bookingsReducer';
import locationReducer from './locationReducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
  request: requestReducer,
  requests: requestsReducer,
  accommodation: accommodationReducer,
  bookings: bookingsReducer,
  locations: locationReducer,
});
