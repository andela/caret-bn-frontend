import { combineReducers } from 'redux';
import authReducer from './authReducer';
import verify from './verifyUserReducer';
import resetpasswordreducer from './resetPasswordReducer';
import requestReducer from './requestReducer';
import requestsReducer from './requestsReducer';
import accommodationReducer from './AccommodationReducer';
import bookingsReducer from './bookingsReducer';
import locationReducer from './locationReducer';
import userReducer from './userReducer';
import roleReducer from './roleReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import managerRequestReducer from './managerRequestReducer';
import managerSearchRequestReducer from './managerSearchRequestReducer';
import allNotifsReducer from './allNotifsReducer';
import processRequestReducer from './processRequestReducer';
import ratingsReducer from './ratingsReducer';
import commentReducer from './commentReducer';
import bookmarksReducer from './bookmarksReducer';
import chatReducer from './chatReducer';
import resetPageReducer from './resetPageReducer';
import privateChat from './privateChatreducer';

export default combineReducers({
  auth: authReducer,
  verify,
  response: resetpasswordreducer,
  request: requestReducer,
  requests: requestsReducer,
  accommodation: accommodationReducer,
  bookings: bookingsReducer,
  locations: locationReducer,
  user: userReducer,
  role: roleReducer,
  alert: alertReducer,
  profile: profileReducer,
  managerRequest: managerRequestReducer,
  managerSearchRequest: managerSearchRequestReducer,
  allNotifs: allNotifsReducer,
  processRequest: processRequestReducer,
  ratings: ratingsReducer,
  requestComment: commentReducer,
  bookmarks: bookmarksReducer,
  chat: chatReducer,
  resetPageReducer,
  privateChat,
});
