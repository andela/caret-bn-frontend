import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';
import accommodationReducer from './AccommodationReducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
  accommodation: accommodationReducer,
});
