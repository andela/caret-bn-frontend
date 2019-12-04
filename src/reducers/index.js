import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';

export default combineReducers({
  auth: authReducer,
  verify,
});
