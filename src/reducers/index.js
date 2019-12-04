import { combineReducers } from 'redux';
import defaultReducer from './defaultReducer';
import authReducer from './authReducer';

export default combineReducers({
  default: defaultReducer,
  auth: authReducer,
});
