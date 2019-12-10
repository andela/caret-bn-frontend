import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';
import requestsReducer from './requestsReducer';
import accommodationReducer from './AccommodationReducer';
import locationReducer from './locationReducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
  requests: requestsReducer,
  accommodation: accommodationReducer,
  locations: locationReducer,
});
