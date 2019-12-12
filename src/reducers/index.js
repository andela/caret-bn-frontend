import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
});
