import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';
import requestReducer from './requestReducer';
import requestsReducer from './requestsReducer';
import accommodationReducer from './AccommodationReducer';
import bookingsReducer from './bookingsReducer';
import locationReducer from './locationReducer';
import searchRequestsReducer from './searchRequestsReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import managerRequestReducer from './managerRequestReducer';
import managerSearchRequestReducer from './managerSearchRequestReducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
  request: requestReducer,
  requests: requestsReducer,
  searchRequests: searchRequestsReducer,
  accommodation: accommodationReducer,
  bookings: bookingsReducer,
  locations: locationReducer,
  user: userReducer,
  role: roleReducer,
  alert: alertReducer,
  profile: profileReducer,
  managerRequest: managerRequestReducer,
  managerSearchRequest: managerSearchRequestReducer,
});
