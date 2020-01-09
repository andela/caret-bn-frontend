import socketIOClient from 'socket.io-client';
import store from '../reduxStore';
import { NEW_NOTIFICATION } from '../actions/types';

const initSocketNotif = () => {
  const socket = socketIOClient.connect('https://caret-bn-backend-staging.herokuapp.com/', {
    query: `token=${localStorage.getItem('token')}`,
  });
  socket.on('notification', (notif) => {
    store.dispatch({
      type: NEW_NOTIFICATION,
      payload: notif,
    });
  });
};
export default initSocketNotif;
