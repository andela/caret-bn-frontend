import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';
import requestsReducer from './requestsReducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
  requests: requestsReducer,
});
